import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  LucideAngularModule, FileText, User, CalendarClock, Stethoscope, Syringe,
  Pill, Building2, ShieldCheck, Lock, Send, AlertTriangle, ExternalLink,
  ChevronRight, X, Eye, EyeOff, Package, LucideIconData, UserCheck,
} from 'lucide-angular';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block';

// ── Interfaces ──────────────────────────────────────────────────────

interface CatalogRef {
  name: string;
  url?: string;
}

interface ValidationRule {
  code?: string;
  description: string;
}

interface BundleEntry {
  id: string;
  index: number;
  resource: string;
  title: string;
  subtitle: string;
  icon: LucideIconData;
  color: string;
  requiredFields: string[];
  catalogs: CatalogRef[];
  validations: ValidationRule[];
  jsonSnippet: string;
  securityNote?: string;
}

interface OperationIssue {
  severity: 'error' | 'warning' | 'information';
  code: string;
  diagnostics: string;
  location: string;
}

// ── Security Architecture Comments ──────────────────────────────────
//
// ARQUITECTURA DE SEGURIDAD — Cumplimiento Ley 1581/2012 y Anexo Técnico MSPS
//
// 1. CREDENCIALES: Este componente frontend NUNCA almacena ni expone
//    client_id, client_secret, ni Ocp-Apim-Subscription-Key.
//    Todas las credenciales se obtienen mediante un Backend-For-Frontend (BFF)
//    que las resuelve desde Azure Key Vault u otro HSM certificado.
//
// 2. CIFRADO EN TRÁNSITO: Toda comunicación con la API del Ministerio
//    fuerza TLS 1.2+ (recomendado TLS 1.3) mediante fetch() exclusivamente
//    sobre https://.
//
// 3. CIFRADO EN REPOSO: Cualquier dato clínico almacenado temporalmente
//    en el navegador (ej. localStorage por desconexión) debe cifrarse con
//    AES-256-GCM antes de persistirse, como lo exige el anexo técnico.
//
// 4. OPERATIONOUTCOME: Las respuestas HTTP 400/409 del MUV devuelven un
//    recurso OperationOutcome con issue[].diagnostics. El sistema debe
//    capturar y mostrar estos errores al usuario.

@Component({
  selector: 'app-estructura-bundle',
  imports: [LucideAngularModule, CodeBlockComponent],
  templateUrl: './estructura-bundle.html',
  styleUrl: './estructura-bundle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstructuraBundleComponent {
  // ── Icon refs ──
  protected readonly FileText = FileText;
  protected readonly ShieldCheck = ShieldCheck;
  protected readonly Lock = Lock;
  protected readonly Send = Send;
  protected readonly AlertTriangle = AlertTriangle;
  protected readonly ExternalLink = ExternalLink;
  protected readonly ChevronRight = ChevronRight;
  protected readonly XIcon = X;
  protected readonly Eye = Eye;
  protected readonly EyeOff = EyeOff;
  protected readonly Package = Package;

  // ── State ──
  protected readonly activeEntry = signal<string | null>(null);
  protected readonly showSecurityPanel = signal(false);
  protected readonly showErrorDemo = signal(false);
  protected readonly sendingRDA = signal(false);
  protected readonly sendResult = signal<'success' | 'error-400' | 'error-409' | null>(null);

  protected readonly activeEntryData = computed(() => {
    const id = this.activeEntry();
    if (!id) return null;
    return this.entries.find(e => e.id === id) ?? null;
  });

  // ── Mock OperationOutcome para demostración ──
  protected readonly mockOperationOutcome: OperationIssue[] = [
    {
      severity: 'error',
      code: 'structure',
      diagnostics: 'El campo "Patient.identifier[0].value" no cumple con el patrón requerido #CC-[0-9]{6,10}. Valor recibido: "12345" sin prefijo de tipo de documento.',
      location: 'Bundle.entry[1].resource.identifier[0].value',
    },
    {
      severity: 'error',
      code: 'business-rule',
      diagnostics: 'RVC033: El código de diagnóstico principal "Z76.0" pertenece a factores de estado de salud (Z00-Z99) pero la finalidad de la consulta no es Promoción y Prevención.',
      location: 'Bundle.entry[3].resource.code.coding[0].code',
    },
    {
      severity: 'warning',
      code: 'informational',
      diagnostics: 'RVG11: El profesional con documento CC-9876543 no se encuentra activo en RETHUS a la fecha de la atención reportada.',
      location: 'Bundle.entry[6].resource.identifier[0].value',
    },
  ];

  // ── Mock Bundle (wrapper) ──
  protected readonly bundleWrapper = `{
  "resourceType": "Bundle",
  "id": "rda-consulta-domicilio-001",
  "type": "document",
  "timestamp": "2026-03-11T10:30:00-05:00",
  "entry": [
    { "resource": { "resourceType": "Composition", ... } },
    { "resource": { "resourceType": "Patient", ... } },
    { "resource": { "resourceType": "Encounter", ... } },
    { "resource": { "resourceType": "Condition", ... } },
    { "resource": { "resourceType": "Procedure", ... } },
    { "resource": { "resourceType": "MedicationRequest", ... } },
    { "resource": { "resourceType": "Practitioner", ... } },
    { "resource": { "resourceType": "Organization", ... } }
  ]
}`;

  // ── Security demo snippets ──
  protected readonly bffSnippet = `// ⛔ NUNCA hacer esto en el frontend:
// const CLIENT_SECRET = "mi-secreto";

// ✅ El frontend llama al BFF (Backend-For-Frontend)
// que resuelve credenciales desde Azure Key Vault
async function obtenerToken(): Promise<string> {
  const res = await fetch("https://mi-bff.falck.co/api/auth/token", {
    method: "POST",
    credentials: "include", // Cookie HttpOnly
  });
  const { access_token } = await res.json();
  return access_token;
}`;

  protected readonly enviarRDASnippet = `/**
 * Envía el Bundle RDA al Ministerio.
 * - Fuerza HTTPS (TLS 1.2+)
 * - Token obtenido del BFF (nunca expuesto al frontend)
 * - Subscription Key inyectada por el proxy/BFF
 */
async function enviarRDA(
  jsonBundle: object,
  token: string,
  subscriptionKey: string
): Promise<Response> {
  const url = "https://ihce.minsalud.gov.co/api/Composition/$enviar-rda-paciente";

  // Validación: solo HTTPS
  if (!url.startsWith("https://")) {
    throw new Error("🔒 Solo se permite comunicación HTTPS (TLS 1.2+)");
  }

  return fetch(url, {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${token}\`,
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Content-Type": "application/fhir+json",
    },
    body: JSON.stringify(jsonBundle),
  });
}`;

  protected readonly cifradoSnippet = `/**
 * Cifrado AES-256-GCM para datos en reposo (localStorage).
 * Requerido por el anexo técnico del Ministerio (Ley 1581/2012).
 */
async function cifrarParaLocalStorage(
  data: string,
  cryptoKey: CryptoKey
): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(data);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encoded
  );

  // Almacenar IV + ciphertext codificado en base64
  const payload = {
    iv: btoa(String.fromCharCode(...iv)),
    data: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
  };
  return JSON.stringify(payload);
}

async function descifrarDesdeLocalStorage(
  stored: string,
  cryptoKey: CryptoKey
): Promise<string> {
  const { iv, data } = JSON.parse(stored);
  const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
  const cipherBytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    cryptoKey,
    cipherBytes
  );
  return new TextDecoder().decode(decrypted);
}`;

  protected readonly operationOutcomeSnippet = `/**
 * Captura y muestra errores OperationOutcome del MUV/VIDA.
 * HTTP 400 = Error de estructura, HTTP 409 = Duplicado.
 */
async function manejarRespuesta(response: Response) {
  if (response.ok) {
    return { success: true, data: await response.json() };
  }

  // El Ministerio devuelve OperationOutcome en errores
  const outcome = await response.json();

  if (outcome.resourceType === "OperationOutcome") {
    const errores = outcome.issue.map((i: any) => ({
      severity: i.severity,
      code: i.code,
      diagnostics: i.diagnostics,
      location: i.expression?.join(", ") ?? "desconocido",
    }));

    return { success: false, status: response.status, errores };
  }

  return { success: false, status: response.status, errores: [] };
}`;

  // ── 8 Bundle entries ──
  protected readonly entries: BundleEntry[] = [
    {
      id: 'composition',
      index: 0,
      resource: 'Composition',
      title: 'Composition (El Índice)',
      subtitle: 'Primera entrada obligatoria. Define al paciente, médico autor, tipo de RDA y sus secciones.',
      icon: FileText,
      color: 'slate',
      requiredFields: [
        'status: "final"',
        'type.coding — Tipo de atención (Ej. "outpatient" = Consulta Externa)',
        'subject — Referencia al Patient (#CC-1234567890)',
        'author[] — Referencia al Practitioner (#CC-NumProfesional)',
        'date — Fecha/hora de creación del documento',
        'title — "Resumen Digital de Atención"',
        'section[] — Secciones obligatorias (Diagnósticos, Procedimientos, Medicamentos)',
      ],
      catalogs: [
        { name: 'TipoDocClinicoRDA', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=TipoDocClinicoRDA' },
      ],
      validations: [
        { description: 'Debe existir al menos una sección por cada tipo clínico (diagnósticos, procedimientos, medicamentos)' },
        { description: 'Si una sección no tiene datos, debe incluir el objeto emptyReason con código "nilknown"' },
        { code: 'RVG02', description: 'El subject debe referenciar exactamente al Patient incluido en el Bundle' },
      ],
      jsonSnippet: `{
  "resourceType": "Composition",
  "status": "final",
  "type": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/TipoDocClinicoRDA",
      "code": "outpatient",
      "display": "Consulta Externa"
    }]
  },
  "subject": { "reference": "#CC-1234567890" },
  "author": [{ "reference": "#CC-51987654" }],
  "date": "2026-03-11T10:30:00-05:00",
  "title": "Resumen Digital de Atención",
  "section": [
    {
      "title": "Diagnósticos",
      "entry": [{ "reference": "#diag-001" }]
    },
    {
      "title": "Medicamentos",
      "emptyReason": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/list-empty-reason",
          "code": "nilknown",
          "display": "Nil Known"
        }]
      }
    }
  ]
}`,
    },
    {
      id: 'patient',
      index: 1,
      resource: 'Patient',
      title: 'Patient (El Paciente)',
      subtitle: 'Datos demográficos del paciente. Debe coincidir exactamente con el registro EVOL (Nombres, apellidos, sexo).',
      icon: User,
      color: 'blue',
      requiredFields: [
        'identifier[0].value — Patrón: #CC-1234567890',
        'name[0].family — Apellidos (validados contra EVOL)',
        'name[0].given[] — Nombres (validados contra EVOL)',
        'gender — Sexo biológico (male | female)',
        'birthDate — Fecha de nacimiento AAAA-MM-DD',
      ],
      catalogs: [
        { name: 'TipoIdPISIS', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=TipoIdPISIS' },
        { name: 'Sexo', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Sexo' },
        { name: 'Pais (ISO 3166-1)', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Pais' },
        { name: 'Municipio (DANE)', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Municipio' },
      ],
      validations: [
        { code: 'RVC001', description: 'El número de documento se cruza con Registraduría. "AS" (Adulto sin identificar) o "MS" (Menor sin identificar) aplican reglas especiales de longitud.' },
        { code: 'RVC007', description: 'La edad del paciente debe ser coherente con el tipo de documento (CC solo para mayores de 18 años).' },
        { code: 'RVC010', description: 'Si la atención es materna/parto/IVE, el sexo debe ser "F".' },
      ],
      jsonSnippet: `{
  "resourceType": "Patient",
  "id": "CC-1234567890",
  "identifier": [{
    "use": "official",
    "type": {
      "coding": [{
        "system": "https://ihce.minsalud.gov.co/CodeSystem/TipoIdPISIS",
        "code": "CC"
      }]
    },
    "value": "1234567890"
  }],
  "name": [{
    "use": "official",
    "family": "GARCÍA MARTÍNEZ",
    "given": ["JUAN", "CARLOS"]
  }],
  "gender": "male",
  "birthDate": "1990-05-15"
}`,
      securityNote: 'Datos protegidos por Ley 1581/2012 (Habeas Data). El identificador se valida en tiempo real contra la base EVOL de la Registraduría Nacional.',
    },
    {
      id: 'encounter',
      index: 2,
      resource: 'Encounter',
      title: 'Encounter (La Atención)',
      subtitle: 'Define la modalidad, entorno y condiciones del encuentro clínico.',
      icon: CalendarClock,
      color: 'emerald',
      requiredFields: [
        'status: "finished"',
        'class — Modalidad de atención',
        'type — Vía de ingreso del usuario',
        'period.start / period.end — Fechas de inicio y fin',
        'reasonCode — Causa / motivo de la atención',
      ],
      catalogs: [
        { name: 'ModalidadAtencion', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=ModalidadAtencion' },
        { name: 'ViaIngresoUsuario', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=ViaIngresoUsuario' },
        { name: 'RIPSCausaExterna', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSCausaExterna' },
        { name: 'CondicionyDestinoUsuarioEgreso', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CondicionyDestinoUsuarioEgreso' },
      ],
      validations: [
        { code: 'RVC039', description: 'La fecha/hora de inicio no puede ser mayor a la actual. La fecha de egreso no puede ser menor a la de inicio.' },
        { description: 'Para servicios a domicilio: modalidad "03" (Extramural domiciliaria) y entorno "01" (Hogar).' },
        { code: 'RVG16', description: 'Si se informan datos de urgencias, la causa de consulta debe coincidir con la causa de urgencia.' },
      ],
      jsonSnippet: `{
  "resourceType": "Encounter",
  "status": "finished",
  "class": {
    "system": "https://ihce.minsalud.gov.co/CodeSystem/ModalidadAtencion",
    "code": "03",
    "display": "Extramural domiciliaria"
  },
  "type": [{
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/ViaIngresoUsuario",
      "code": "01",
      "display": "Consulta externa"
    }]
  }],
  "period": {
    "start": "2026-03-11T08:00:00-05:00",
    "end": "2026-03-11T08:45:00-05:00"
  },
  "serviceType": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/EntornoAtencion",
      "code": "01",
      "display": "Hogar"
    }]
  }
}`,
    },
    {
      id: 'condition',
      index: 3,
      resource: 'Condition',
      title: 'Condition (Hallazgos / Diagnósticos)',
      subtitle: 'Diagnóstico principal y relacionados del paciente.',
      icon: Stethoscope,
      color: 'amber',
      requiredFields: [
        'code.coding[0].code — Código CIE-10 o CIE-11',
        'code.coding[0].display — Nombre del diagnóstico',
        'category — Principal o Relacionado',
        'clinicalStatus — active | recurrence | inactive',
      ],
      catalogs: [
        { name: 'CIE-10', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CIE10' },
        { name: 'RIPSTipoDiagnósticoPrincipal', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSTipoDiagnosticoPrincipalVersion2' },
      ],
      validations: [
        { code: 'RVC033', description: 'El diagnóstico principal NO puede ser código de causas externas (V01-Y98) ni factores de salud (Z00-Z99) salvo que la finalidad sea Promoción y Prevención.' },
        { code: 'RVC085', description: 'El diagnóstico debe validarse por edad y sexo del paciente.' },
        { code: 'RVC086', description: 'El diagnóstico relacionado no puede ser igual al principal.' },
      ],
      jsonSnippet: `{
  "resourceType": "Condition",
  "id": "diag-001",
  "clinicalStatus": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
      "code": "active"
    }]
  },
  "category": [{
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/RIPSTipoDiagnosticoPrincipalVersion2",
      "code": "02",
      "display": "Confirmado nuevo"
    }]
  }],
  "code": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/CIE10",
      "code": "J06.9",
      "display": "Infección aguda de las vías respiratorias superiores"
    }]
  },
  "subject": { "reference": "#CC-1234567890" }
}`,
    },
    {
      id: 'procedure',
      index: 4,
      resource: 'Procedure',
      title: 'Procedure (Procedimientos)',
      subtitle: 'Intervenciones y procedimientos realizados al paciente.',
      icon: Syringe,
      color: 'violet',
      requiredFields: [
        'code.coding[0].code — Código CUPS (6 caracteres)',
        'code.coding[0].display — Nombre del procedimiento',
        'status: "completed"',
        'performedDateTime — Fecha/hora de realización',
      ],
      catalogs: [
        { name: 'CUPS', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CUPS' },
        { name: 'FinalidadConsulta', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSFinalidadConsultaVersion2' },
      ],
      validations: [
        { code: 'RVC059', description: 'El código CUPS debe existir y validarse contra grupo de servicio, sexo y edad del paciente.' },
        { code: 'RVC051', description: 'La finalidad debe ser coherente con sexo y edad. Ej. No se puede enviar control prenatal en hombres.' },
        { code: 'RVC034', description: 'Si modalidad "Pago por evento": valor > 0. Si cápita: valor = 0.' },
      ],
      jsonSnippet: `{
  "resourceType": "Procedure",
  "id": "proc-001",
  "status": "completed",
  "code": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/CUPS",
      "code": "890201",
      "display": "Consulta de primera vez por medicina general"
    }]
  },
  "subject": { "reference": "#CC-1234567890" },
  "performedDateTime": "2026-03-11T08:30:00-05:00"
}`,
    },
    {
      id: 'medication',
      index: 5,
      resource: 'MedicationRequest',
      title: 'MedicationRequest (Medicamentos)',
      subtitle: 'Fórmulas médicas o medicamentos administrados.',
      icon: Pill,
      color: 'rose',
      requiredFields: [
        'medicationCodeableConcept.coding[0].code — Código IUM o DCI',
        'medicationCodeableConcept.coding[0].display — Nombre del medicamento',
        'status: "active" | "completed"',
        'dosageInstruction — Posología (cantidad, frecuencia)',
      ],
      catalogs: [
        { name: 'IUM (Identificador Único de Medicamento)', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=IUM' },
        { name: 'UMM (Unidad de Medida)', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=UMM' },
      ],
      validations: [
        { code: 'RVC063', description: 'Medicamentos de preparación magistral usan código DCI en lugar de IUM.' },
        { code: 'RVC064', description: 'El código debe existir en la base de SISPRO.' },
        { code: 'RVG13', description: 'No pueden enviarse dos medicamentos con el mismo código exacto para el mismo usuario.' },
        { code: 'RVG01', description: 'Las cantidades deben ser números enteros positivos mayores a cero.' },
      ],
      jsonSnippet: `{
  "resourceType": "MedicationRequest",
  "id": "med-001",
  "status": "active",
  "intent": "order",
  "medicationCodeableConcept": {
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/IUM",
      "code": "20045671",
      "display": "Acetaminofén 500 mg tableta"
    }]
  },
  "subject": { "reference": "#CC-1234567890" },
  "dosageInstruction": [{
    "text": "1 tableta cada 8 horas por 5 días",
    "doseAndRate": [{
      "doseQuantity": {
        "value": 1,
        "unit": "tableta"
      }
    }]
  }]
}`,
    },
    {
      id: 'practitioner',
      index: 6,
      resource: 'Practitioner',
      title: 'Practitioner (Profesional Tratante)',
      subtitle: 'Médico o profesional de salud que realiza la atención.',
      icon: UserCheck,
      color: 'cyan',
      requiredFields: [
        'identifier[0].value — Referencia local #CC-Numero',
        'name[0].family — Apellidos del profesional',
        'name[0].given[] — Nombres del profesional',
        'qualification — Número de tarjeta profesional',
      ],
      catalogs: [
        { name: 'RETHUS (Registro de Talento Humano en Salud)', url: 'https://web.sispro.gov.co/THS/Cliente/ConsultasPublicas/ConsultaPublicaDeTHxIdentificacion.aspx' },
      ],
      validations: [
        { code: 'RVG11', description: 'Se valida en tiempo real que el profesional esté activo en RETHUS. Si no está activo, el RDA es rechazado.' },
        { description: 'El tipo y número de documento deben coincidir exactamente con RETHUS.' },
      ],
      jsonSnippet: `{
  "resourceType": "Practitioner",
  "id": "CC-51987654",
  "identifier": [{
    "use": "official",
    "type": {
      "coding": [{
        "system": "https://ihce.minsalud.gov.co/CodeSystem/TipoIdPISIS",
        "code": "CC"
      }]
    },
    "value": "51987654"
  }],
  "name": [{
    "use": "official",
    "family": "RODRÍGUEZ LÓPEZ",
    "given": ["MARÍA", "ELENA"]
  }],
  "qualification": [{
    "code": {
      "coding": [{
        "system": "https://ihce.minsalud.gov.co/CodeSystem/RETHUS",
        "code": "MD",
        "display": "Médico(a)"
      }]
    }
  }]
}`,
      securityNote: 'Validación RETHUS en tiempo real. El profesional debe estar activo en el portal del Ministerio al momento del envío.',
    },
    {
      id: 'organization',
      index: 7,
      resource: 'Organization',
      title: 'Organization (Prestador / IPS)',
      subtitle: 'Identificación de la IPS o empresa prestadora de salud.',
      icon: Building2,
      color: 'teal',
      requiredFields: [
        'identifier[0].value — Código REPS de 12 dígitos (#NumeroDeHabilitacion)',
        'name — Nombre de la IPS',
        'type — Tipo de prestador',
      ],
      catalogs: [
        { name: 'IPSCodHabilitacion (REPS)', url: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=IPSCodHabilitacion' },
      ],
      validations: [
        { code: 'RVC002', description: 'El NIT del facturador debe coincidir con el registrado en la tabla REPS del Ministerio.' },
        { description: 'Se identifica con el código REPS de 12 dígitos usando el patrón #NumeroDeHabilitacion.' },
      ],
      jsonSnippet: `{
  "resourceType": "Organization",
  "id": "org-001",
  "identifier": [{
    "use": "official",
    "system": "https://ihce.minsalud.gov.co/CodeSystem/IPSCodHabilitacion",
    "value": "110011234501"
  }],
  "name": "IPS FALCK SERVICIOS MÉDICOS DOMICILIARIOS",
  "type": [{
    "coding": [{
      "system": "https://ihce.minsalud.gov.co/CodeSystem/TipoPrestador",
      "code": "IPS",
      "display": "Institución Prestadora de Servicios de Salud"
    }]
  }]
}`,
    },
  ];

  // ── Color helpers (returns tailwind classes based on entry color) ──
  protected entryBg(color: string): string {
    const map: Record<string, string> = {
      slate: 'bg-slate-50 border-slate-200',
      blue: 'bg-blue-50 border-blue-200',
      emerald: 'bg-emerald-50 border-emerald-200',
      amber: 'bg-amber-50 border-amber-200',
      violet: 'bg-violet-50 border-violet-200',
      rose: 'bg-rose-50 border-rose-200',
      cyan: 'bg-cyan-50 border-cyan-200',
      teal: 'bg-teal-50 border-teal-200',
    };
    return map[color] ?? map['slate'];
  }

  protected entryActiveBg(color: string): string {
    const map: Record<string, string> = {
      slate: 'bg-slate-100 border-slate-400 ring-2 ring-slate-300',
      blue: 'bg-blue-100 border-blue-400 ring-2 ring-blue-300',
      emerald: 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300',
      amber: 'bg-amber-100 border-amber-400 ring-2 ring-amber-300',
      violet: 'bg-violet-100 border-violet-400 ring-2 ring-violet-300',
      rose: 'bg-rose-100 border-rose-400 ring-2 ring-rose-300',
      cyan: 'bg-cyan-100 border-cyan-400 ring-2 ring-cyan-300',
      teal: 'bg-teal-100 border-teal-400 ring-2 ring-teal-300',
    };
    return map[color] ?? map['slate'];
  }

  protected iconBg(color: string): string {
    const map: Record<string, string> = {
      slate: 'bg-slate-200 text-slate-700',
      blue: 'bg-blue-200 text-blue-700',
      emerald: 'bg-emerald-200 text-emerald-700',
      amber: 'bg-amber-200 text-amber-700',
      violet: 'bg-violet-200 text-violet-700',
      rose: 'bg-rose-200 text-rose-700',
      cyan: 'bg-cyan-200 text-cyan-700',
      teal: 'bg-teal-200 text-teal-700',
    };
    return map[color] ?? map['slate'];
  }

  protected headerBg(color: string): string {
    const map: Record<string, string> = {
      slate: 'bg-slate-800',
      blue: 'bg-blue-700',
      emerald: 'bg-emerald-700',
      amber: 'bg-amber-700',
      violet: 'bg-violet-700',
      rose: 'bg-rose-700',
      cyan: 'bg-cyan-700',
      teal: 'bg-teal-700',
    };
    return map[color] ?? map['slate'];
  }

  protected severityClass(severity: string): string {
    const map: Record<string, string> = {
      error: 'bg-red-50 border-red-300 text-red-800',
      warning: 'bg-amber-50 border-amber-300 text-amber-800',
      information: 'bg-blue-50 border-blue-300 text-blue-800',
    };
    return map[severity] ?? map['information'];
  }

  protected severityBadge(severity: string): string {
    const map: Record<string, string> = {
      error: 'bg-red-600 text-white',
      warning: 'bg-amber-500 text-white',
      information: 'bg-blue-500 text-white',
    };
    return map[severity] ?? map['information'];
  }

  // ── Methods ──
  protected onEntryHover(id: string): void {
    this.activeEntry.set(id);
  }

  protected onEntryLeave(): void {
    // Don't clear on leave — let user click/hover freely
    // Only clear if clicking outside or pressing escape
  }

  protected selectEntry(id: string): void {
    this.activeEntry.update(current => current === id ? null : id);
  }

  protected clearSelection(): void {
    this.activeEntry.set(null);
  }

  protected toggleSecurityPanel(): void {
    this.showSecurityPanel.update(v => !v);
    if (this.showSecurityPanel()) {
      this.showErrorDemo.set(false);
    }
  }

  protected toggleErrorDemo(): void {
    this.showErrorDemo.update(v => !v);
    if (this.showErrorDemo()) {
      this.showSecurityPanel.set(false);
    }
  }

  /** Simulates sending the RDA and receiving an OperationOutcome error */
  protected async simularEnvioRDA(): Promise<void> {
    this.sendingRDA.set(true);
    this.sendResult.set(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a 400 error with OperationOutcome
    this.sendingRDA.set(false);
    this.sendResult.set('error-400');
    this.showErrorDemo.set(true);
  }
}
