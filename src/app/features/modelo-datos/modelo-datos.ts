import { ChangeDetectionStrategy, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import {
  LucideAngularModule, User, CalendarClock, Stethoscope, Syringe, Pill,
  Building2, ChevronDown, ChevronRight, ExternalLink, AlertTriangle,
  ShieldCheck, Database, X, Search, Filter, LucideIconData,
} from 'lucide-angular';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block';

interface FieldRow {
  atributo: string;
  tipo: string;
  obligatoriedad: 'Obligatorio' | 'Condicional' | 'Opcional';
  obligatoriedadNota?: string;
  catalogo: string;
  catalogoUrl?: string;
  endpoint?: string;
  regla: string;
  reglaCodigo?: string;
}

interface EntitySection {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  fhirResource: string;
  icon: LucideIconData;
  color: string;
  fields: FieldRow[];
}

type ObligFilter = 'all' | 'Obligatorio' | 'Condicional' | 'Opcional';

@Component({
  selector: 'app-modelo-datos',
  imports: [LucideAngularModule, CodeBlockComponent],
  templateUrl: './modelo-datos.html',
  styleUrl: './modelo-datos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeloDatosComponent {
  protected readonly AlertTriangle = AlertTriangle;
  protected readonly ShieldCheck = ShieldCheck;
  protected readonly Database = Database;
  protected readonly ExternalLink = ExternalLink;
  protected readonly ChevronDown = ChevronDown;
  protected readonly ChevronRight = ChevronRight;
  protected readonly SearchIcon = Search;
  protected readonly FilterIcon = Filter;
  protected readonly X = X;

  private readonly rulesDialog = viewChild<ElementRef<HTMLDialogElement>>('rulesDialog');
  private readonly backendDialog = viewChild<ElementRef<HTMLDialogElement>>('backendDialog');

  protected readonly searchQuery = signal('');
  protected readonly activeEntity = signal<string | null>(null);
  protected readonly obligFilter = signal<ObligFilter>('all');
  protected readonly expandedField = signal<string | null>(null);

  protected readonly emptyReasonSnippet = `"emptyReason": {
  "coding": [{
    "system": "http://terminology.hl7.org/CodeSystem/list-empty-reason",
    "code": "nilknown",
    "display": "Nil Known"
  }]
}`;

  protected readonly totalFields = computed(() =>
    this.entities.reduce((sum, e) => sum + e.fields.length, 0)
  );

  protected readonly stats = computed(() => {
    let obligatorio = 0;
    let condicional = 0;
    let opcional = 0;
    for (const e of this.entities) {
      for (const f of e.fields) {
        if (f.obligatoriedad === 'Obligatorio') obligatorio++;
        else if (f.obligatoriedad === 'Condicional') condicional++;
        else opcional++;
      }
    }
    return { obligatorio, condicional, opcional };
  });

  protected readonly filteredEntities = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const activeId = this.activeEntity();
    const oblig = this.obligFilter();

    let result = this.entities;

    if (activeId) {
      result = result.filter(e => e.id === activeId);
    }

    if (!query && oblig === 'all') return result;

    return result
      .map(entity => {
        const filtered = entity.fields.filter(f => {
          const matchesOblig = oblig === 'all' || f.obligatoriedad === oblig;
          const matchesQuery = !query
            || f.atributo.toLowerCase().includes(query)
            || f.catalogo.toLowerCase().includes(query)
            || f.tipo.toLowerCase().includes(query)
            || (f.reglaCodigo?.toLowerCase().includes(query) ?? false);
          return matchesOblig && matchesQuery;
        });
        return { ...entity, fields: filtered };
      })
      .filter(entity => entity.fields.length > 0);
  });

  protected readonly entities: EntitySection[] = [
    {
      id: 'paciente',
      number: 1,
      title: 'PACIENTE',
      subtitle: 'Identificación del usuario',
      fhirResource: 'Patient / Usuarios',
      icon: User,
      color: 'blue',
      fields: [
        {
          atributo: 'tipo_documento',
          tipo: 'String (Fijo: 2)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'TipoIdPISIS',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=TipoIdPISIS',
          endpoint: 'GET [url-base]/CodeSystem/TipoIdPISIS/$validate-code?code={codigo}',
          regla: 'La edad extraída de la fecha de nacimiento debe ser coherente con el tipo de documento (Ej. CC solo para mayores de edad)',
          reglaCodigo: 'RVC007',
        },
        {
          atributo: 'numero_documento',
          tipo: 'String (Variable: 4-20)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'Alfanumérico (Validado por EVOL)',
          endpoint: 'POST [url-base]/Patient/$consultar-paciente-similar',
          regla: 'Se cruzará con la Registraduría. Si se envía "AS" (Adulto sin identificar) o "MS" (Menor sin identificar), se aplican reglas especiales de longitud',
          reglaCodigo: 'RVC001',
        },
        {
          atributo: 'fecha_nacimiento',
          tipo: 'String/Date (16) AAAA-MM-DD',
          obligatoriedad: 'Obligatorio',
          catalogo: 'Dato propio',
          regla: 'La fecha de nacimiento NO puede ser mayor a la fecha actual ni a la fecha de la prestación del servicio',
          reglaCodigo: 'RVC006, RVC079',
        },
        {
          atributo: 'sexo_biologico',
          tipo: 'String (Fijo: 1)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'Sexo',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Sexo',
          endpoint: 'GET [url-base]/CodeSystem/Sexo/$validate-code?code={codigo}',
          regla: 'Si la atención es materna, parto o IVE, el sexo debe ser estrictamente "F" o "M" según lo mapeado',
          reglaCodigo: 'RVC010',
        },
        {
          atributo: 'codigo_pais',
          tipo: 'String (Fijo: 3)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'ISO 3166-1',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Pais',
          endpoint: 'GET [url-base]/CodeSystem/Pais/$validate-code?code={codigo}',
          regla: 'Por defecto usar "170" para Colombia',
        },
        {
          atributo: 'codigo_municipio',
          tipo: 'String (Fijo: 5)',
          obligatoriedad: 'Condicional',
          obligatoriedadNota: 'Usa null si es extranjero',
          catalogo: 'Código DANE',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=Municipio',
          endpoint: 'GET [url-base]/CodeSystem/Municipio/$validate-code?code={codigo}',
          regla: 'Si el país de residencia es Colombia (170), este campo NO puede enviarse en null y debe tener 5 caracteres exactos',
        },
      ],
    },
    {
      id: 'encuentro',
      number: 2,
      title: 'ATENCIÓN / ENCUENTRO',
      subtitle: 'Datos del encuentro clínico',
      fhirResource: 'Encounter / Consultas',
      icon: CalendarClock,
      color: 'emerald',
      fields: [
        {
          atributo: 'fechas_inicio_fin',
          tipo: 'String (Fijo: 16) AAAA-MM-DD HH:mm',
          obligatoriedad: 'Obligatorio',
          catalogo: 'Dato propio',
          regla: 'La fecha/hora de inicio no puede ser mayor a la actual. La fecha de egreso/fin no puede ser menor a la fecha de inicio de la atención',
          reglaCodigo: 'RVC039',
        },
        {
          atributo: 'modalidad_atencion',
          tipo: 'String (Fijo: 2)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'ModalidadAtencion',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=ModalidadAtencion',
          endpoint: 'GET [url-base]/CodeSystem/ModalidadAtencion/$validate-code?code={codigo}',
          regla: 'Si es atención a domicilio programada usar "03". Si es ambulancia/prehospitalaria usar "05"',
        },
        {
          atributo: 'via_ingreso',
          tipo: 'String (Fijo: 2)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'ViaIngresoUsuario',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=ViaIngresoUsuario',
          endpoint: 'GET [url-base]/CodeSystem/ViaIngresoUsuario/$validate-code?code={codigo}',
          regla: 'Debe cruzar lógicamente con el grupo de servicio',
        },
        {
          atributo: 'causa_motivo',
          tipo: 'String (Fijo: 2)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'RIPSCausaExterna',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSCausaExterna',
          endpoint: 'GET [url-base]/CodeSystem/RIPSCausaExterna/$validate-code?code={codigo}',
          regla: 'Si se informan datos de urgencias, la causa de la consulta debe coincidir con la causa de la urgencia',
          reglaCodigo: 'RVG16',
        },
        {
          atributo: 'destino_egreso',
          tipo: 'String (Fijo: 2)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'CondicionyDestino',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CondicionyDestinoUsuarioEgreso',
          endpoint: 'GET [url-base]/CodeSystem/CondicionyDestinoUsuarioEgreso/$validate-code?code={codigo}',
          regla: 'Si el destino es "02" (Paciente muerto), no se pueden registrar servicios con fecha/hora posterior. Si es derivado a otra IPS, se debe informar la IPS destino',
          reglaCodigo: 'R09, RVC062',
        },
      ],
    },
    {
      id: 'diagnosticos',
      number: 3,
      title: 'HALLAZGOS CLÍNICOS',
      subtitle: 'Diagnósticos del paciente',
      fhirResource: 'Condition',
      icon: Stethoscope,
      color: 'amber',
      fields: [
        {
          atributo: 'codigo_diag_ppal',
          tipo: 'String (Variable: 4-25)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'CIE-10 / CIE-11',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CIE10',
          endpoint: 'GET [url-base]/CodeSystem/CIE10/$validate-code?code={codigo}',
          regla: 'El diagnóstico principal no puede ser un código de causas externas (V01-Y98) ni de factores de estado de salud (Z00-Z99) a menos que la finalidad sea promoción y prevención. Validar por edad y sexo del paciente',
          reglaCodigo: 'RVC033, RVC085',
        },
        {
          atributo: 'cod_diag_relacionado',
          tipo: 'String (Variable: 4-25)',
          obligatoriedad: 'Opcional',
          obligatoriedadNota: 'Usa null',
          catalogo: 'CIE-10',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CIE10',
          endpoint: 'GET [url-base]/CodeSystem/CIE10/$validate-code?code={codigo}',
          regla: 'No puede ser igual al diagnóstico principal, ni igual a otro diagnóstico relacionado enviado en el mismo paquete',
          reglaCodigo: 'RVC086, RVC087',
        },
        {
          atributo: 'tipo_diagnostico',
          tipo: 'String (Fijo: 2)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'TipoDiagnostico',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSTipoDiagnosticoPrincipalVersion2',
          endpoint: 'GET [url-base]/CodeSystem/RIPSTipoDiagnosticoPrincipalVersion2/$validate-code?code={codigo}',
          regla: 'Especificar si es "01" (Impresión), "02" (Confirmado nuevo) o "03" (Confirmado repetido)',
        },
      ],
    },
    {
      id: 'procedimientos',
      number: 4,
      title: 'PROCEDIMIENTOS',
      subtitle: 'Procedimientos realizados',
      fhirResource: 'Procedure',
      icon: Syringe,
      color: 'violet',
      fields: [
        {
          atributo: 'codigo_proced',
          tipo: 'String (Fijo: 6)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'CUPS',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=CUPS',
          endpoint: 'GET [url-base]/CodeSystem/CUPS/$validate-code?code={codigo}',
          regla: 'El código debe existir y ser validado con el grupo de servicio, sexo y edad del paciente',
          reglaCodigo: 'RVC059, RVC082',
        },
        {
          atributo: 'finalidad_tecn',
          tipo: 'String (Fijo: 2)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'FinalidadConsulta',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=RIPSFinalidadConsultaVersion2',
          endpoint: 'GET [url-base]/CodeSystem/RIPSFinalidadConsultaVersion2/$validate-code?code={codigo}',
          regla: 'Debe ser coherente con el sexo y edad del paciente. Ej. No se puede enviar control prenatal en hombres',
          reglaCodigo: 'RVC051',
        },
        {
          atributo: 'valor_procedimiento',
          tipo: 'Numeric (1-15)',
          obligatoriedad: 'Obligatorio',
          obligatoriedadNota: 'Para RIPS',
          catalogo: 'Dato financiero propio',
          regla: 'Si la modalidad de pago es "Pago por evento", debe ser mayor a 0. Para otras modalidades (cápita), se debe informar estrictamente 0 (cero)',
          reglaCodigo: 'RVC034',
        },
      ],
    },
    {
      id: 'medicamentos',
      number: 5,
      title: 'MEDICAMENTOS',
      subtitle: 'Formulación y administración',
      fhirResource: 'MedicationStatement / MedicationRequest',
      icon: Pill,
      color: 'rose',
      fields: [
        {
          atributo: 'codigo_medicam',
          tipo: 'String (Variable: 1-20)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'IUM / CUM',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=IUM',
          endpoint: 'GET [url-base]/CodeSystem/IUM/$validate-code?code={codigo}',
          regla: 'Si el medicamento es de preparación magistral se usa el código DCI. El código debe existir en la base de SISPRO. No pueden enviarse dos medicamentos con el mismo código exacto para el mismo usuario',
          reglaCodigo: 'RVC063, RVC064, RVG13',
        },
        {
          atributo: 'cantidad_medicam',
          tipo: 'Numeric (1-10)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'Dato propio',
          regla: 'Las cantidades entregadas o aplicadas deben ser números enteros positivos mayores a cero',
          reglaCodigo: 'RVG01',
        },
        {
          atributo: 'unidad_medida',
          tipo: 'Numeric (0-4)',
          obligatoriedad: 'Opcional',
          catalogo: 'UMM',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=UMM',
          endpoint: 'GET [url-base]/CodeSystem/UMM/$validate-code?code={codigo}',
          regla: 'Solo requerido para ciertas formas farmacéuticas y concentraciones',
        },
      ],
    },
    {
      id: 'profesional',
      number: 6,
      title: 'PROFESIONAL E IPS',
      subtitle: 'Profesional, recaudos y facturación',
      fhirResource: 'Practitioner / Organization',
      icon: Building2,
      color: 'cyan',
      fields: [
        {
          atributo: 'doc_profesional',
          tipo: 'String (Variable: 4-20)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'RETHUS',
          catalogoUrl: 'https://web.sispro.gov.co/THS/Cliente/ConsultasPublicas/ConsultaPublicaDeTHxIdentificacion.aspx',
          endpoint: 'POST [url-base]/Practitioner/$consultar-profesional-salud',
          regla: 'El sistema verificará en tiempo real que el profesional se encuentre activo en RETHUS. Si no lo está, rechaza',
          reglaCodigo: 'RVG11',
        },
        {
          atributo: 'cod_habilitacion',
          tipo: 'String (Fijo: 12)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'REPS',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=IPSCodHabilitacion',
          endpoint: 'GET [url-base]/CodeSystem/IPSCodHabilitacion/$validate-code?code={codigo}',
          regla: 'El NIT del facturador debe coincidir con el de la tabla REPS',
          reglaCodigo: 'RVC002',
        },
        {
          atributo: 'concepto_recaudo',
          tipo: 'String (Fijo: 2)',
          obligatoriedad: 'Obligatorio',
          catalogo: 'conceptoRecaudo',
          catalogoUrl: 'https://web.sispro.gov.co/WebPublico/Consultas/ConsultarDetalleReferenciaBasica.aspx?Code=conceptoRecaudo',
          endpoint: 'GET [url-base]/CodeSystem/conceptoRecaudo/$validate-code?code={codigo}',
          regla: 'Solo se puede cobrar "01: Cuota moderadora" a afiliados del régimen contributivo. Para subsidiado, no se puede',
          reglaCodigo: 'RVC035, RVC037',
        },
        {
          atributo: 'valorPagoModerador',
          tipo: 'Numeric (1-10)',
          obligatoriedad: 'Condicional',
          obligatoriedadNota: 'Usa 0',
          catalogo: 'Dato propio',
          regla: 'Si aplica cuota moderadora, el valor debe ser mayor o igual a 1. Si no aplica (ej. código "05: No aplica"), debe ser estrictamente 0',
          reglaCodigo: 'RVC060, RVC061',
        },
      ],
    },
  ];

  protected toggleField(fieldId: string): void {
    this.expandedField.update(current => current === fieldId ? null : fieldId);
  }

  protected isFieldExpanded(fieldId: string): boolean {
    return this.expandedField() === fieldId;
  }

  protected setActiveEntity(id: string | null): void {
    this.activeEntity.set(id);
  }

  protected setObligFilter(filter: ObligFilter): void {
    this.obligFilter.set(filter);
  }

  protected onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected clearSearch(): void {
    this.searchQuery.set('');
  }

  protected openRulesDialog(): void {
    this.rulesDialog()?.nativeElement.showModal();
  }

  protected openBackendDialog(): void {
    this.backendDialog()?.nativeElement.showModal();
  }

  protected closeDialog(dialog: HTMLDialogElement): void {
    dialog.close();
  }
}
