import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideAngularModule, FileHeart, Stethoscope, Ambulance, ShieldCheck, LucideIconData } from 'lucide-angular';
import { RdaPacienteComponent } from './rda-paciente/rda-paciente';
import { RdaConsultaComponent } from './rda-consulta/rda-consulta';
import { RdaUrgenciasComponent } from './rda-urgencias/rda-urgencias';
import { ReglasTransversalesComponent } from './reglas-transversales/reglas-transversales';

interface RdaTab {
  id: string;
  icon: LucideIconData;
  label: string;
  shortLabel: string;
  color: string;
  activeColor: string;
}

@Component({
  selector: 'app-mapeo-rda',
  imports: [
    LucideAngularModule,
    RdaPacienteComponent,
    RdaConsultaComponent,
    RdaUrgenciasComponent,
    ReglasTransversalesComponent,
  ],
  templateUrl: './mapeo-rda.html',
  styleUrl: './mapeo-rda.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapeoRdaComponent {
  protected readonly activeTab = signal('paciente');

  protected readonly tabs: RdaTab[] = [
    { id: 'paciente', icon: FileHeart, label: 'RDA Paciente (Evento)', shortLabel: 'Paciente', color: 'text-blue-600', activeColor: 'border-blue-600 bg-blue-50 text-blue-700' },
    { id: 'consulta', icon: Stethoscope, label: 'RDA Consulta Externa', shortLabel: 'Consulta', color: 'text-emerald-600', activeColor: 'border-emerald-600 bg-emerald-50 text-emerald-700' },
    { id: 'urgencias', icon: Ambulance, label: 'RDA Urgencias', shortLabel: 'Urgencias', color: 'text-red-600', activeColor: 'border-red-600 bg-red-50 text-red-700' },
    { id: 'reglas', icon: ShieldCheck, label: 'Reglas Transversales', shortLabel: 'Reglas', color: 'text-amber-600', activeColor: 'border-amber-600 bg-amber-50 text-amber-700' },
  ];

  protected setTab(id: string): void {
    this.activeTab.set(id);
  }
}
