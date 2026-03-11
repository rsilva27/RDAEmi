import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, User, Clock, Stethoscope, MapPin, Building, Heart } from 'lucide-angular';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block';

@Component({
  selector: 'app-rda-paciente',
  imports: [LucideAngularModule, CodeBlockComponent],
  templateUrl: './rda-paciente.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RdaPacienteComponent {
  protected readonly User = User;
  protected readonly Clock = Clock;
  protected readonly Stethoscope = Stethoscope;
  protected readonly MapPin = MapPin;
  protected readonly Building = Building;
  protected readonly Heart = Heart;

  protected readonly modalidades = [
    { code: '03', label: 'Extramural domiciliaria' },
    { code: '05', label: 'Extramural (atención prehospitalaria o transporte asistencial)' },
  ];

  protected readonly tiposDx = [
    { code: '01', label: 'Impresión diagnóstica' },
    { code: '02', label: 'Confirmado nuevo' },
    { code: '03', label: 'Confirmado repetido' },
  ];

  protected readonly patientExample = `{
  "resourceType": "Patient",
  "identifier": [{
    "type": { "coding": [{ "code": "CC" }] },
    "value": "1032473124"
  }],
  "name": [{
    "family": "García Pérez",
    "given": ["Juan", "Carlos"]
  }],
  "gender": "male",
  "birthDate": "1985-03-15",
  "address": [{
    "extension": [{
      "url": "municipio",
      "valueCoding": { "code": "11001", "display": "Bogotá D.C." }
    }],
    "country": "CO"
  }]
}`;
}
