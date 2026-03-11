import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Server, CheckCircle2 } from 'lucide-angular';

@Component({
  selector: 'app-rips',
  imports: [LucideAngularModule],
  templateUrl: './rips.html',
  styleUrl: './rips.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RipsComponent {
  protected readonly Server = Server;
  protected readonly CheckCircle2 = CheckCircle2;

  protected readonly flowSteps = [
    'El HIS genera y envía el RIPS JSON al Minsalud.',
    'Si es válido, Minsalud devuelve un CUV (Código Único de Validación) cifrado.',
    'Este CUV se incluye obligatoriamente en la Factura Electrónica (FEV) enviada a la DIAN.',
    'Con RIPS (CUV) y FEV validados, se radica la cuenta ante la EPS.',
  ];
}
