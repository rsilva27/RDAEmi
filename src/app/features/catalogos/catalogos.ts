import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Catalogo {
  title: string;
  description: string;
  colorClass: string;
}

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.html',
  styleUrl: './catalogos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogosComponent {
  protected readonly catalogos: Catalogo[] = [
    { title: 'CIE-10 / CIE-11', description: 'Diagnósticos principales, relacionados y causas de muerte.', colorClass: 'bg-rose-50 border-rose-200 text-rose-800' },
    { title: 'CUPS', description: 'Clasificación Única de Procedimientos en Salud (exámenes, cirugías, laboratorios).', colorClass: 'bg-blue-50 border-blue-200 text-blue-800' },
    { title: 'IUM y CUM', description: 'Identificador Único de Medicamento. Para prescripción y dispensación.', colorClass: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { title: 'REPS', description: 'Catálogo de Instituciones Prestadoras (IPS) y códigos de habilitación vigentes.', colorClass: 'bg-purple-50 border-purple-200 text-purple-800' },
    { title: 'RETHUS', description: 'Registro Único Nacional del Talento Humano en Salud.', colorClass: 'bg-amber-50 border-amber-200 text-amber-800' },
    { title: 'DCI', description: 'Denominación Común Internacional. Usada exclusivamente para fórmulas magistrales.', colorClass: 'bg-slate-50 border-slate-300 text-slate-800' },
  ];
}
