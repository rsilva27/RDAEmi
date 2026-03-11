import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EndpointRowComponent } from '../../shared/components/endpoint-row/endpoint-row';

interface Endpoint {
  method: 'POST' | 'GET';
  path: string;
  description: string;
}

interface EndpointGroup {
  title: string;
  endpoints: Endpoint[];
}

@Component({
  selector: 'app-endpoints',
  imports: [EndpointRowComponent],
  templateUrl: './endpoints.html',
  styleUrl: './endpoints.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndpointsComponent {
  protected readonly headers = [
    'Authorization: Bearer <token>',
    'Ocp-Apim-Subscription-Key: <subscription-key>',
    'Content-Type: application/fhir+json',
  ];

  protected readonly groups: EndpointGroup[] = [
    {
      title: 'A. Envío de Resúmenes Digitales de Atención (RDA)',
      endpoints: [
        { method: 'POST', path: '/Composition/$enviar-rda-paciente', description: 'Envío de RDA general ambulatorio.' },
        { method: 'POST', path: '/Composition/$enviar-rda-hospitalizacion', description: 'Envío de RDA para paciente hospitalizado.' },
        { method: 'POST', path: '/Composition/$enviar-rda-urgencias', description: 'Envío de RDA para atención en urgencias.' },
      ],
    },
    {
      title: 'B. Búsqueda y Consulta',
      endpoints: [
        { method: 'POST', path: '/Composition/$consultar-rda-paciente', description: 'Listar RDAs. Body requiere identifier tipo CC y value.' },
        { method: 'GET', path: '/siguiente-pagina/{id_devuelto_link.url}', description: 'Paginación de resultados de búsqueda.' },
        { method: 'GET', path: '/Composition/{id}/$document', description: 'Obtener un RDA específico (Bundle completo).' },
        { method: 'GET', path: '/Patient/{id-patient}/$consultar-resumen-longitudinal', description: 'Obtener el resumen longitudinal del paciente.' },
        { method: 'POST', path: '/Patient/$consultar-paciente-similar', description: 'Búsqueda por similaridad (pacientes sin ID exacto).' },
      ],
    },
    {
      title: 'C. Validaciones Previas',
      endpoints: [
        { method: 'POST', path: '/Practitioner/$consultar-profesional-salud', description: 'Permite verificar si el profesional está activo en RETHUS antes de enviar el RDA.' },
      ],
    },
  ];
}
