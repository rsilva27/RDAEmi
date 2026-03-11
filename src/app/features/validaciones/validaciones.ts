import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, AlertTriangle, Lock } from 'lucide-angular';

@Component({
  selector: 'app-validaciones',
  imports: [LucideAngularModule],
  templateUrl: './validaciones.html',
  styleUrl: './validaciones.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidacionesComponent {
  protected readonly AlertTriangle = AlertTriangle;
  protected readonly Lock = Lock;
}
