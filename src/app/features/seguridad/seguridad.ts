import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  LucideAngularModule, Shield, ShieldCheck, ShieldAlert, Lock, Key, KeyRound,
  Users, UserCheck, Server, Cloud, Network, AlertTriangle, CheckCircle2,
  ChevronDown, ChevronRight, ExternalLink, Building2, RefreshCw, Eye,
  HardDrive, FileText, Code2, Wifi, WifiOff, Siren, LucideIconData,
} from 'lucide-angular';

// ── Interfaces ──

interface PolicyItem {
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
}

interface SubSection {
  id: string;
  number: string;
  title: string;
  description: string;
  items: PolicyItem[];
}

interface SecurityLevel {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  icon: LucideIconData;
  color: string;
  audience: string;
  subsections: SubSection[];
}

@Component({
  selector: 'app-seguridad',
  imports: [LucideAngularModule],
  templateUrl: './seguridad.html',
  styleUrl: './seguridad.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeguridadComponent {
  // ── Icons ──
  protected readonly Shield = Shield;
  protected readonly ShieldCheck = ShieldCheck;
  protected readonly ShieldAlert = ShieldAlert;
  protected readonly Lock = Lock;
  protected readonly Key = Key;
  protected readonly KeyRound = KeyRound;
  protected readonly Users = Users;
  protected readonly UserCheck = UserCheck;
  protected readonly Server = Server;
  protected readonly Cloud = Cloud;
  protected readonly Network = Network;
  protected readonly AlertTriangle = AlertTriangle;
  protected readonly CheckCircle2 = CheckCircle2;
  protected readonly ChevronDown = ChevronDown;
  protected readonly ChevronRight = ChevronRight;
  protected readonly ExternalLink = ExternalLink;
  protected readonly Building2 = Building2;
  protected readonly RefreshCw = RefreshCw;
  protected readonly Eye = Eye;
  protected readonly HardDrive = HardDrive;
  protected readonly FileText = FileText;
  protected readonly Code2 = Code2;
  protected readonly Wifi = Wifi;
  protected readonly WifiOff = WifiOff;
  protected readonly Siren = Siren;

  // ── State ──
  protected readonly activeLevel = signal<string>('nivel-1');
  protected readonly expandedSections = signal<Set<string>>(new Set<string>());

  protected readonly activeLevelData = computed(() =>
    this.levels.find(l => l.id === this.activeLevel()) ?? this.levels[0]
  );

  protected readonly severityCounts = computed(() => {
    let critical = 0, high = 0, medium = 0, info = 0;
    for (const level of this.levels) {
      for (const sub of level.subsections) {
        for (const item of sub.items) {
          if (item.severity === 'critical') critical++;
          else if (item.severity === 'high') high++;
          else if (item.severity === 'medium') medium++;
          else info++;
        }
      }
    }
    return { critical, high, medium, info, total: critical + high + medium + info };
  });

  // ── Data ──
  protected readonly levels: SecurityLevel[] = [
    {
      id: 'nivel-1',
      number: 1,
      title: 'Gestión Administrativa y Gobernanza',
      shortTitle: 'Gobernanza',
      subtitle: 'Responsabilidades legales, credenciales y políticas de acceso',
      description: 'Define las responsabilidades de la Gerencia, Dirección Médica y Líderes de TI para cumplir con las normativas de protección de datos (Ley 1581 de 2012) y asegurar el acceso legal a la plataforma del Estado.',
      icon: Building2,
      color: 'blue',
      audience: 'Gerencia · Dirección Médica · Líderes TI',
      subsections: [
        {
          id: 'sec-1-1',
          number: '1.1',
          title: 'Gestión de Credenciales y Delegación (Sistema Hércules)',
          description: 'El Ministerio no entrega llaves a cualquier persona. Se debe seguir un conducto regular estricto:',
          items: [
            {
              title: 'Delegación Legal',
              description: 'El representante legal de Grupo emi debe ingresar a www.miseguridadsocial.gov.co y asignar el rol de "Delegado Administrativo" a un líder tecnológico o administrativo de la empresa.',
              severity: 'high',
            },
            {
              title: 'Registro en Hércules',
              description: 'El Delegado Administrativo debe registrarse en el sistema Hércules del Ministerio, seleccionando el módulo "Registro de Usuarios - IHCE" y registrando el NIT de la entidad.',
              severity: 'high',
            },
            {
              title: 'Solicitud de Llaves (ClientID / ClientSecret)',
              description: 'A través del panel "Inscripción Token", el Delegado registrará el nombre del proveedor tecnológico, nombre del software (HIS) y los datos del líder técnico. El Ministerio aprobará la solicitud y asignará el ClientID y ClientSecret para Preproducción y Producción.',
              severity: 'critical',
            },
          ],
        },
        {
          id: 'sec-1-2',
          number: '1.2',
          title: 'Políticas de Acceso y Continuidad',
          description: 'Controles organizacionales para asegurar la operación continua y el acceso autorizado.',
          items: [
            {
              title: 'Control de Acceso Basado en Roles (RBAC)',
              description: 'Solo el personal médico y de salud autorizado puede consultar los RDA de los pacientes. Este acceso debe limitarse estrictamente a fines asistenciales.',
              severity: 'high',
            },
            {
              title: 'Rotación de Secretos',
              description: 'El ClientSecret tiene una validez temporal. La gerencia de TI debe programar su rotación periódica y revocarlo inmediatamente en caso de sospecha de vulneración.',
              severity: 'critical',
            },
            {
              title: 'Planes de Contingencia (BCP / DRP)',
              description: 'El Ministerio exige un Plan de Continuidad del Negocio (BCP) y un Plan de Recuperación de Desastres (DRP) que garanticen que la entidad siga funcionando e integrando datos ante cualquier incidente informático.',
              severity: 'high',
            },
          ],
        },
      ],
    },
    {
      id: 'nivel-2',
      number: 2,
      title: 'Desarrollo y Arquitectura de Software (HIS)',
      shortTitle: 'Desarrollo',
      subtitle: 'Autenticación, estructuración de payload y manejo de errores',
      description: 'Instrucciones profundas para los desarrolladores Backend y Frontend encargados de programar la integración mediante la API REST y el estándar HL7 FHIR.',
      icon: Code2,
      color: 'violet',
      audience: 'Desarrolladores Backend · Frontend · QA',
      subsections: [
        {
          id: 'sec-2-1',
          number: '2.1',
          title: 'Autenticación y Consumo Seguro (OAuth2)',
          description: 'Protocolos de autenticación y comunicación con la API del Ministerio.',
          items: [
            {
              title: 'Prohibición de Hardcoding',
              description: 'El código fuente (especialmente Frontend o Apps móviles) JAMÁS debe contener el ClientID, ClientSecret ni el Ocp-Apim-Subscription-Key. Deben inyectarse desde un gestor de secretos seguro (ej. Azure Key Vault).',
              severity: 'critical',
            },
            {
              title: 'Obtención del Token',
              description: 'El backend debe hacer un POST a https://login.microsoftonline.com/<tenantid>/oauth2/v2.0/token enviando grant_type=client_credentials.',
              severity: 'high',
            },
            {
              title: 'Cabeceras Obligatorias (Headers)',
              description: 'Cada petición debe incluir: Authorization: Bearer <token>, Ocp-Apim-Subscription-Key: <llave>, Content-Type: application/fhir+json.',
              severity: 'high',
            },
            {
              title: 'Cifrado en Tránsito (TLS)',
              description: 'Toda la comunicación se debe forzar por HTTPS utilizando protocolos TLS 1.3 (o mínimo TLS 1.2). No se permite tráfico HTTP sin cifrar.',
              severity: 'critical',
            },
          ],
        },
        {
          id: 'sec-2-2',
          number: '2.2',
          title: 'Algoritmo de Estructuración del Payload (FHIR Bundle)',
          description: 'El archivo JSON a enviar debe armarse siguiendo reglas inquebrantables del Motor de Validación.',
          items: [
            {
              title: 'Estructura Raíz del Bundle',
              description: 'El atributo "resourceType" debe ser "Bundle" y el "type" debe ser "document". Cualquier otro valor será rechazado.',
              severity: 'high',
            },
            {
              title: 'Posición del Índice (Composition)',
              description: 'La primera entrada obligatoria del arreglo entry[] siempre debe ser el recurso "Composition". Es el índice que describe todo el documento.',
              severity: 'high',
            },
            {
              title: 'Regla de Referencias Internas (#)',
              description: 'El paciente se referencia como #TipoID-NumID (Ej. #CC-1234567890), pero el atributo "id" dentro del bloque debe ir SIN numeral: "id": "CC-1234567890". Aplica igual para IPS (#CódigoREPS), médico (#CC-Numero) y EPS (#EPS000).',
              severity: 'high',
            },
            {
              title: 'Secciones Vacías (emptyReason)',
              description: 'Si un dato clínico obligatorio no fue reportado (ej. no tiene alergias), NO se puede enviar null ni omitir la sección. Se debe generar un objeto "emptyReason" con código "nilknown" y texto informativo.',
              severity: 'critical',
            },
          ],
        },
        {
          id: 'sec-2-3',
          number: '2.3',
          title: 'Lógica de Manejo de Errores y Excepciones',
          description: 'La API no devuelve texto plano, devuelve un objeto FHIR estructurado llamado OperationOutcome.',
          items: [
            {
              title: 'Errores de Estructura (HTTP 400)',
              description: 'El código debe iterar sobre el arreglo issue[] del OperationOutcome para mostrar en la interfaz (HIS) exactamente qué campo falló (ej. tamaño del documento, código CIE-10 inválido).',
              severity: 'high',
            },
            {
              title: 'Filtro de Duplicidad (HTTP 409 Conflict)',
              description: 'El sistema rechazará un envío duplicado solo si coinciden EXACTAMENTE estos 4 atributos en Encounter: subject (paciente), period (fecha/hora), serviceProvider (la IPS) y participant (el médico). Si un solo segundo difiere, se tomará como registro nuevo.',
              severity: 'high',
            },
          ],
        },
        {
          id: 'sec-2-4',
          number: '2.4',
          title: 'Adjuntos y PDF (DocumentReference)',
          description: 'Si la historia clínica a domicilio incluye un PDF firmado (Epicrisis):',
          items: [
            {
              title: 'Tipo MIME Obligatorio',
              description: 'El campo contentType debe ser obligatoriamente application/pdf. Otros formatos serán rechazados.',
              severity: 'medium',
            },
            {
              title: 'Conversión a Base64',
              description: 'El backend debe convertir el binario del PDF a una cadena Base64 antes de incluirlo en el recurso DocumentReference.',
              severity: 'medium',
            },
            {
              title: 'Validación de Peso',
              description: 'Se debe programar una validación previa: el archivo no puede superar el límite (ej. 5 MB) antes de enviarse o será rechazado por el API Gateway.',
              severity: 'medium',
            },
          ],
        },
        {
          id: 'sec-2-5',
          number: '2.5',
          title: 'Resiliencia y Asincronismo (Backoff)',
          description: 'Dado que los médicos operan en terreno (domicilios y ambulancias):',
          items: [
            {
              title: 'UI No Bloqueante',
              description: 'La interfaz de la tablet/app no debe bloquearse esperando la respuesta del Ministerio. Se debe usar procesamiento asíncrono.',
              severity: 'high',
            },
            {
              title: 'Reintentos con Backoff Exponencial',
              description: 'El backend debe implementar un mecanismo de encolamiento y una política de reintentos con backoff exponencial para manejar fallas de red en campo.',
              severity: 'high',
            },
          ],
        },
        {
          id: 'sec-2-6',
          number: '2.6',
          title: 'Validaciones Clínicas Previas (Caché Local)',
          description: 'Para evitar rebotes por datos inválidos:',
          items: [
            {
              title: 'Sincronización de Catálogos',
              description: 'El backend debe consumir las APIs del Ministerio para mantener sincronizados los catálogos CIE-10, CUPS y Medicamentos.',
              severity: 'medium',
            },
            {
              title: 'Verificación RETHUS Pre-Envío',
              description: 'Antes de generar el documento, el HIS debe invocar POST /Practitioner/$consultar-profesional-salud para asegurar que el médico está activo en RETHUS. Si no lo está, el RDA será rechazado.',
              severity: 'critical',
            },
          ],
        },
      ],
    },
    {
      id: 'nivel-3',
      number: 3,
      title: 'Infraestructura, Redes y SOC (Azure)',
      shortTitle: 'Infraestructura',
      subtitle: 'VPN, alta disponibilidad, monitoreo y transición X-Road',
      description: 'Lineamientos exclusivos para los ingenieros de infraestructura en la nube y arquitectura de red.',
      icon: Server,
      color: 'cyan',
      audience: 'Arquitectos Cloud · SRE · Ingenieros de Red · SOC',
      subsections: [
        {
          id: 'sec-3-1',
          number: '3.1',
          title: 'Establecimiento del Túnel VPN (Site-to-Site)',
          description: 'Grupo emi utiliza Microsoft Azure. La conectividad NO se hace por internet público — la Guía de Conectividad exige un Azure VPN Gateway (Site-to-Site IPSec).',
          items: [
            {
              title: 'Azure VPN Gateway IPSec',
              description: 'Se debe establecer un túnel Site-to-Site directo contra el Firewall del Nodo Territorial (Secretaría de Salud) o del Ministerio. No se permite tráfico por internet público.',
              severity: 'critical',
            },
            {
              title: 'IKE Phase 1 (Negociación)',
              description: 'Algoritmo de cifrado: AES-128 o AES-256 obligatorio. Algoritmo de autenticación: SHA-256. Las políticas personalizadas IPSec/IKE deben configurarse exactamente según el anexo técnico.',
              severity: 'high',
            },
            {
              title: 'IPSec Phase 2',
              description: 'Algoritmo de autenticación mínimo SHA-1. Se recomienda SHA-256 para mayor seguridad.',
              severity: 'high',
            },
          ],
        },
        {
          id: 'sec-3-2',
          number: '3.2',
          title: 'Alta Disponibilidad (HA) y Direccionamiento',
          description: 'Requisitos de redundancia y control de acceso a nivel de red.',
          items: [
            {
              title: 'Enlace Dedicado Active-Active',
              description: 'El Ministerio recomienda disponer de enlaces de datos y seguridad perimetral en configuración de Alta Disponibilidad (Active-Active) para que la operación no se interrumpa.',
              severity: 'high',
            },
            {
              title: 'IP Estática (Whitelisting)',
              description: 'El Azure VPN Gateway debe tener una IP Pública Estática que será compartida con la Secretaría de Salud para configurar reglas de Firewall permitiendo exclusivamente el tráfico de Grupo emi.',
              severity: 'high',
            },
          ],
        },
        {
          id: 'sec-3-3',
          number: '3.3',
          title: 'Monitoreo, Auditoría y SIEM',
          description: 'Registro y trazabilidad de todas las operaciones.',
          items: [
            {
              title: 'Trazabilidad Inmutable',
              description: 'Se debe registrar (Log) cada petición hacia las APIs del Ministerio: fecha, hora, usuario/sistema que realizó la acción, tipo de operación y el estado HTTP de la transacción.',
              severity: 'high',
            },
            {
              title: 'Retención de Logs',
              description: 'Los registros deben almacenarse de forma segura y cumplir con los tiempos de retención estipulados por la ley para inspecciones y control.',
              severity: 'high',
            },
          ],
        },
        {
          id: 'sec-3-4',
          number: '3.4',
          title: 'Transición Tecnológica Futura (X-Road)',
          description: 'La implementación del túnel VPN se define como una medida transitoria.',
          items: [
            {
              title: 'Migración a X-Road (MinTIC)',
              description: 'El equipo de arquitectura debe estar preparado para que, en la siguiente fase de madurez, la conectividad migre al Mecanismo de Conexión X-Road (estándar de interoperabilidad de MinTIC). Esto requerirá el despliegue de un Servidor de Seguridad (Security Server) nativo dentro de la red virtual de Azure.',
              severity: 'info',
            },
          ],
        },
      ],
    },
  ];

  // ── Color helpers ──

  protected levelTabBg(color: string, isActive: boolean): string {
    if (isActive) {
      const active: Record<string, string> = {
        blue: 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-400',
        violet: 'bg-violet-600 text-white shadow-lg shadow-violet-200 ring-2 ring-violet-400',
        cyan: 'bg-cyan-600 text-white shadow-lg shadow-cyan-200 ring-2 ring-cyan-400',
      };
      return active[color] ?? active['blue'];
    }
    const inactive: Record<string, string> = {
      blue: 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700',
      violet: 'bg-white border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-700',
      cyan: 'bg-white border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 text-slate-700',
    };
    return inactive[color] ?? inactive['blue'];
  }

  protected levelIconBg(color: string, isActive: boolean): string {
    if (isActive) {
      return 'bg-white/20 text-white';
    }
    const map: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      violet: 'bg-violet-100 text-violet-600',
      cyan: 'bg-cyan-100 text-cyan-600',
    };
    return map[color] ?? map['blue'];
  }

  protected sectionHeaderBg(color: string): string {
    const map: Record<string, string> = {
      blue: 'border-l-blue-500',
      violet: 'border-l-violet-500',
      cyan: 'border-l-cyan-500',
    };
    return map[color] ?? map['blue'];
  }

  protected severityBadge(severity: string): string {
    const map: Record<string, string> = {
      critical: 'bg-red-100 text-red-700 border border-red-200',
      high: 'bg-amber-100 text-amber-700 border border-amber-200',
      medium: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      info: 'bg-blue-100 text-blue-700 border border-blue-200',
    };
    return map[severity] ?? map['info'];
  }

  protected severityLabel(severity: string): string {
    const map: Record<string, string> = {
      critical: 'Crítico',
      high: 'Alto',
      medium: 'Medio',
      info: 'Informativo',
    };
    return map[severity] ?? 'Info';
  }

  protected severityIcon(severity: string): LucideIconData {
    const map: Record<string, LucideIconData> = {
      critical: ShieldAlert,
      high: AlertTriangle,
      medium: Eye,
      info: FileText,
    };
    return map[severity] ?? FileText;
  }

  protected severityItemBg(severity: string): string {
    const map: Record<string, string> = {
      critical: 'bg-red-50 border-red-200',
      high: 'bg-amber-50 border-amber-200',
      medium: 'bg-yellow-50 border-yellow-200',
      info: 'bg-blue-50 border-blue-200',
    };
    return map[severity] ?? map['info'];
  }

  // ── Methods ──

  protected setActiveLevel(id: string): void {
    this.activeLevel.set(id);
    this.expandedSections.set(new Set());
  }

  protected toggleSection(id: string): void {
    this.expandedSections.update(set => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  protected isSectionExpanded(id: string): boolean {
    return this.expandedSections().has(id);
  }

  protected expandAll(): void {
    const level = this.activeLevelData();
    this.expandedSections.set(new Set(level.subsections.map(s => s.id)));
  }

  protected collapseAll(): void {
    this.expandedSections.set(new Set());
  }
}
