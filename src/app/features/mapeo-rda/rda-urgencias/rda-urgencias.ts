import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Siren, Activity, Pill, Stethoscope, FileDown, ArrowRightLeft } from 'lucide-angular';

@Component({
  selector: 'app-rda-urgencias',
  imports: [LucideAngularModule],
  templateUrl: './rda-urgencias.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RdaUrgenciasComponent {
  protected readonly Siren = Siren;
  protected readonly Activity = Activity;
  protected readonly Pill = Pill;
  protected readonly Stethoscope = Stethoscope;
  protected readonly FileDown = FileDown;
  protected readonly ArrowRightLeft = ArrowRightLeft;

  protected readonly diagnosticosUrgencia = [
    { label: 'CIE-10 principal de ingreso', required: true },
    { label: 'CIE-10 principal de egreso', required: true },
    { label: 'Diagnósticos relacionados', required: true },
    { label: 'Diagnóstico de complicación', required: false },
    { label: 'Diagnóstico causa básica de muerte', required: false },
  ];

  protected readonly medAdminFields = [
    'Código IUM del medicamento',
    'Dosis administrada institucionalmente',
    'Vía de administración',
    'Código de unidad de medida (ej. miligramos)',
    'Fecha y hora exacta de aplicación',
    'Identificación de quien lo administró',
  ];
}
