import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  LucideAngularModule, KeyRound, Database, ShieldCheck, Send, Search,
  ChevronDown, ChevronRight, ArrowDown, Lock, CheckCircle2, AlertTriangle,
  Clock, Wifi, WifiOff, LucideIconData,
} from 'lucide-angular';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block';

interface Endpoint {
  method: 'POST' | 'GET';
  path: string;
  description: string;
  body?: string;
  note?: string;
}

interface Phase {
  id: string;
  number: number;
  icon: LucideIconData;
  title: string;
  subtitle: string;
  color: string;        // tailwind color prefix e.g. 'amber'
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  iconTextClass: string;
  badgeBgClass: string;
  badgeTextClass: string;
  description: string;
  endpoints: Endpoint[];
  responseNote?: string;
}

@Component({
  selector: 'app-flujo-api',
  imports: [LucideAngularModule, CodeBlockComponent],
  templateUrl: './flujo-api.html',
  styleUrl: './flujo-api.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlujoApiComponent {
  protected readonly KeyRound = KeyRound;
  protected readonly Lock = Lock;
  protected readonly CheckCircle2 = CheckCircle2;
  protected readonly AlertTriangle = AlertTriangle;
  protected readonly ArrowDown = ArrowDown;
  protected readonly ChevronDown = ChevronDown;
  protected readonly ChevronRight = ChevronRight;
  protected readonly Clock = Clock;
  protected readonly Wifi = Wifi;
  protected readonly WifiOff = WifiOff;

  protected readonly expandedPhases = signal<Set<string>>(new Set(['fase-1']));

  protected readonly headers = [
    { key: 'Authorization', value: 'Bearer <token_generado>' },
    { key: 'Ocp-Apim-Subscription-Key', value: '<tu_clave_de_suscripcion>' },
    { key: 'Content-Type', value: 'application/fhir+json' },
  ];

  protected readonly tokenExample = `POST https://login.microsoftonline.com/<tenantid>/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=<tu_client_id>
&client_secret=<tu_client_secret>
&scope=<scope_asignado>

// Respuesta (duración: ~3599 segundos = 1 hora)
{
  "token_type": "Bearer",
  "expires_in": 3599,
  "access_token": "eyJ0eXAiOiJKV1Q..."
}`;

  protected readonly phases: Phase[] = [
    {
      id: 'fase-1',
      number: 1,
      icon: KeyRound,
      title: 'Autenticación',
      subtitle: 'Obtención del Token OAuth2',
      color: 'amber',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-200',
      iconBgClass: 'bg-amber-500',
      iconTextClass: 'text-amber-500',
      badgeBgClass: 'bg-amber-100',
      badgeTextClass: 'text-amber-800',
      description: 'Obtener el token de seguridad temporal mediante flujo OAuth2. Este token dura usualmente 1 hora (3599 segundos). Es el único endpoint que NO requiere las cabeceras estándar.',
      endpoints: [
        {
          method: 'POST',
          path: 'https://login.microsoftonline.com/<tenantid>/oauth2/v2.0/token',
          description: 'Obtener token de acceso (Client Credentials)',
          body: 'grant_type=client_credentials, client_id, client_secret, scope',
          note: 'Content-Type: application/x-www-form-urlencoded (no FHIR)',
        },
      ],
    },
    {
      id: 'fase-2',
      number: 2,
      icon: Database,
      title: 'Terminologías',
      subtitle: 'Mantenimiento y Caché Local',
      color: 'blue',
      bgClass: 'bg-blue-50',
      borderClass: 'border-blue-200',
      iconBgClass: 'bg-blue-500',
      iconTextClass: 'text-blue-500',
      badgeBgClass: 'bg-blue-100',
      badgeTextClass: 'text-blue-800',
      description: 'Antes de permitir que un médico registre una atención, tu sistema debe asegurarse de tener los catálogos correctos. El Ministerio recomienda mantener esto sincronizado localmente.',
      endpoints: [
        { method: 'GET', path: '/CodeSystem/{code-system}', description: 'Obtener un catálogo completo (CUPS, CIE-10, IUM, etc.)' },
        { method: 'GET', path: '/CodeSystem/{code-system}/$validate-code?code={código}', description: 'Validar un código específico contra el catálogo' },
        { method: 'POST', path: '/CodeSystem/$lookup', description: 'Obtener detalle ampliado de una codificación' },
      ],
    },
    {
      id: 'fase-3',
      number: 3,
      icon: ShieldCheck,
      title: 'Validaciones Previas',
      subtitle: 'Durante la Consulta Médica',
      color: 'emerald',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-200',
      iconBgClass: 'bg-emerald-500',
      iconTextClass: 'text-emerald-500',
      badgeBgClass: 'bg-emerald-100',
      badgeTextClass: 'text-emerald-800',
      description: 'Para evitar que el envío final del RDA sea rechazado, tu sistema debe hacer estas validaciones contra las bases maestras del Ministerio antes de armar el JSON.',
      endpoints: [
        {
          method: 'POST',
          path: '/Practitioner/$consultar-profesional-salud',
          description: 'Validar al profesional de salud contra RETHUS',
          body: 'Recurso Parameters con tipo y número de identificación del médico',
          note: 'Verifica que el médico esté activo y habilitado',
        },
        {
          method: 'POST',
          path: '/Patient/$consultar-paciente-similar',
          description: 'Validar o buscar pacientes por similaridad',
          body: 'Recurso Parameters con identificador, nombres o sexo biológico',
          note: 'Útil cuando hay dudas sobre la identificación del paciente',
        },
      ],
    },
    {
      id: 'fase-4',
      number: 4,
      icon: Send,
      title: 'Envío del RDA',
      subtitle: 'Al Finalizar el Servicio',
      color: 'red',
      bgClass: 'bg-red-50',
      borderClass: 'border-red-200',
      iconBgClass: 'bg-red-500',
      iconTextClass: 'text-red-500',
      badgeBgClass: 'bg-red-100',
      badgeTextClass: 'text-red-800',
      description: 'Una vez termina la atención y el médico guarda la historia clínica, tu sistema debe armar el JSON (Bundle tipo document) y enviarlo al endpoint correspondiente.',
      endpoints: [
        { method: 'POST', path: '/Composition/$enviar-rda-paciente', description: 'Eventos Básicos / Consultas a domicilio' },
        { method: 'POST', path: '/Composition/$enviar-rda-urgencias', description: 'Urgencias y Ambulancias' },
        { method: 'POST', path: '/Composition/$enviar-rda-hospitalizacion', description: 'Hospitalización' },
      ],
      responseNote: 'Éxito: HTTP 200 + código VIDA (recibo oficial). Error: HTTP 400 (validación) o 409 (duplicado) con OperationOutcome.',
    },
    {
      id: 'fase-5',
      number: 5,
      icon: Search,
      title: 'Búsqueda y Consulta',
      subtitle: 'Para Nuevas Atenciones',
      color: 'violet',
      bgClass: 'bg-violet-50',
      borderClass: 'border-violet-200',
      iconBgClass: 'bg-violet-500',
      iconTextClass: 'text-violet-500',
      badgeBgClass: 'bg-violet-100',
      badgeTextClass: 'text-violet-800',
      description: 'Si tu médico llega al domicilio de un paciente y necesita ver su historia clínica nacional, debe invocar el visor de historia clínica integrado al HIS.',
      endpoints: [
        {
          method: 'POST',
          path: '/Composition/$consultar-rda-paciente',
          description: 'Listar todas las atenciones previas (RDAs)',
          body: 'Identificador del paciente: { type: CC, value: 1032473124 }',
          note: 'Retorna lista paginada de atenciones previas',
        },
        {
          method: 'GET',
          path: '/siguiente-pagina/{id devuelto link.url}',
          description: 'Paginación de resultados cuando hay muchas atenciones',
        },
        {
          method: 'GET',
          path: '/Composition/{id}/$document',
          description: 'Descargar un RDA específico (PDF o detalle clínico)',
        },
        {
          method: 'GET',
          path: '/Patient/{id-patient}/$consultar-resumen-longitudinal',
          description: 'Resumen longitudinal: vista unificada de diagnósticos, medicamentos y alergias en el tiempo',
        },
      ],
    },
  ];

  protected isExpanded(phaseId: string): boolean {
    return this.expandedPhases().has(phaseId);
  }

  protected togglePhase(phaseId: string): void {
    this.expandedPhases.update(set => {
      const next = new Set(set);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  }

  protected expandAll(): void {
    this.expandedPhases.set(new Set(this.phases.map(p => p.id)));
  }

  protected collapseAll(): void {
    this.expandedPhases.set(new Set());
  }
}
