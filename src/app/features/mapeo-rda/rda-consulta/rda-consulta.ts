import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Home, Clock, AlertCircle, Pill, ClipboardList, FileDown, LucideIconData } from 'lucide-angular';

interface FactorRiesgo {
  code: string;
  label: string;
}

@Component({
  selector: 'app-rda-consulta',
  imports: [LucideAngularModule],
  templateUrl: './rda-consulta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RdaConsultaComponent {
  protected readonly Home = Home;
  protected readonly Clock = Clock;
  protected readonly AlertCircle = AlertCircle;
  protected readonly Pill = Pill;
  protected readonly ClipboardList = ClipboardList;
  protected readonly FileDown = FileDown;

  protected readonly factoresRiesgo: FactorRiesgo[] = [
    { code: '01', label: 'Químicos' },
    { code: '02', label: 'Físicos' },
    { code: '03', label: 'Biomecánicos' },
    { code: '04', label: 'Psicosociales' },
    { code: '05', label: 'Biológicos' },
    { code: '06', label: 'Otro' },
  ];

  protected readonly medicamentoFields = [
    { field: 'Tipo tecnología', desc: '02: Medicamento con registro sanitario' },
    { field: 'Código IUM', desc: 'Identificador único del medicamento' },
    { field: 'Descripción', desc: 'Nombre común del medicamento' },
    { field: 'Fecha prescripción', desc: 'Fecha en que se formula' },
    { field: 'Dosis', desc: 'Cantidad por toma' },
    { field: 'Unidad de medida', desc: 'mg, ml, UI, etc.' },
    { field: 'Vía administración', desc: 'Oral, IV, IM, SC, etc.' },
    { field: 'Cantidad', desc: 'Total de unidades entregadas' },
    { field: 'Frecuencia', desc: 'Intervalo de administración' },
    { field: 'Duración (días)', desc: 'Duración del tratamiento' },
  ];
}
