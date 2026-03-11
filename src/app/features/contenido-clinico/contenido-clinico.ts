import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, FileText, Activity, BookOpen, LucideIconData } from 'lucide-angular';

interface ClinicalBlock {
  icon: LucideIconData;
  title: string;
  description: string;
}

@Component({
  selector: 'app-contenido-clinico',
  imports: [LucideAngularModule],
  templateUrl: './contenido-clinico.html',
  styleUrl: './contenido-clinico.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContenidoClinicoComponent {
  protected readonly blocks: ClinicalBlock[] = [
    {
      icon: FileText,
      title: 'Identificación del Paciente',
      description: 'Tipo/número de documento, nombres, apellidos, fecha nacimiento, sexo biológico, país origen, identidad de género, etnia, zona territorial y administrador de beneficios (EPS).',
    },
    {
      icon: Activity,
      title: 'Detalle de la Atención',
      description: 'Modalidad de servicio (Intramural, extramural, telemedicina), vía de ingreso, causa de atención, fechas inicio/fin, entorno de atención.',
    },
    {
      icon: BookOpen,
      title: 'Procedimientos, Medicamentos y Profesional',
      description: 'Documento del tratante. Códigos CUPS/IUM, fecha de prescripción, dosis, frecuencia, cantidad entregada.',
    },
  ];
}
