import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, AlertTriangle, Ban, Hash, BookMarked, UserCheck, Wifi } from 'lucide-angular';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-reglas-transversales',
  imports: [LucideAngularModule, CodeBlockComponent],
  templateUrl: './reglas-transversales.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReglasTransversalesComponent {
  protected readonly AlertTriangle = AlertTriangle;
  protected readonly Ban = Ban;
  protected readonly Hash = Hash;
  protected readonly BookMarked = BookMarked;
  protected readonly UserCheck = UserCheck;
  protected readonly Wifi = Wifi;

  protected readonly terminologias = [
    { code: 'CUPS', desc: 'Cualquier procedimiento o laboratorio', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { code: 'CIE-10 / CIE-11', desc: 'Diagnósticos y causas de consulta', color: 'bg-rose-50 border-rose-200 text-rose-800' },
    { code: 'IUM / CUM', desc: 'Identificación de medicamentos', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
  ];

  protected readonly referenciaExample = `// Dentro del Bundle, una fórmula referencia a un diagnóstico:
"reference": "#Condition-0"   // ← con numeral

// El recurso referenciado declara su ID sin numeral:
"id": "Condition-0"           // ← sin numeral

// Referencias nacionales:
"reference": "Patient/#CC-1032473124"       // Paciente
"reference": "Practitioner/#CC-987654321"   // Médico
"reference": "#110010123401"                // Prestador (habilitación)`;
}
