import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Key } from 'lucide-angular';

@Component({
  selector: 'app-autenticacion',
  imports: [LucideAngularModule],
  templateUrl: './autenticacion.html',
  styleUrl: './autenticacion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutenticacionComponent {
  protected readonly Key = Key;

  protected readonly steps = [
    {
      num: '1',
      color: 'blue',
      title: 'Validación de Túnel VPN',
      description: 'Se verifica la comunicación exitosa en ambos tramos: MSPS ↔ Nodo Territorial ↔ IPS.',
      isFinal: false,
    },
    {
      num: '2',
      color: 'blue',
      title: 'Gestión de Código REPS (Secretaría)',
      description: 'La Secretaría de Salud valida y gestiona qué prestadores de su región harán uso de IHCE, remitiendo el código REPS de las IPS al MSPS.',
      isFinal: false,
    },
    {
      num: '3',
      color: 'blue',
      title: 'Creación de API Key (MSPS)',
      description: 'El MSPS genera el API-KEY en el API Gateway y lo entrega exclusivamente al Nodo Territorial, quien a su vez lo reenvía a la IPS correspondiente.',
      isFinal: false,
    },
    {
      num: '4',
      color: 'emerald',
      title: 'Configuración y Pruebas en el HIS',
      description: 'La IPS configura el API-KEY en su software y ejecuta el ciclo de pruebas completo:',
      isFinal: true,
    },
  ];

  protected readonly testItems = [
    'Validación de estructura del mensaje (Bundle).',
    'Test de envío de registro de RDA.',
    'Test de consulta y obtención de RDA.',
  ];
}
