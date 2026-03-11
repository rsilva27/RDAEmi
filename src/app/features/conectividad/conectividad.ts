import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Server, Network, CheckCircle2 } from 'lucide-angular';

@Component({
  selector: 'app-conectividad',
  imports: [LucideAngularModule],
  templateUrl: './conectividad.html',
  styleUrl: './conectividad.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConectividadComponent {
  protected readonly Server = Server;
  protected readonly Network = Network;
  protected readonly CheckCircle2 = CheckCircle2;
}
