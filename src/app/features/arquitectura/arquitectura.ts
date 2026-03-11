import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import {
  LucideAngularModule, Database, Lock, ArrowRight, Building2,
  ShieldAlert, Shield, Server, ChevronRight,
} from 'lucide-angular';

interface NodeDetail {
  title: string;
  desc: string;
}

@Component({
  selector: 'app-arquitectura',
  imports: [LucideAngularModule],
  templateUrl: './arquitectura.html',
  styleUrl: './arquitectura.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArquitecturaComponent {
  protected readonly Database = Database;
  protected readonly Lock = Lock;
  protected readonly ArrowRight = ArrowRight;
  protected readonly Building2 = Building2;
  protected readonly ShieldAlert = ShieldAlert;
  protected readonly Shield = Shield;
  protected readonly Server = Server;
  protected readonly ChevronRight = ChevronRight;

  protected readonly activeNode = signal<string | null>(null);

  protected readonly nodeDetails: Record<string, NodeDetail> = {
    his: { title: 'HIS / ERP (Entorno IPS)', desc: 'Sistema de Información Hospitalaria local. Genera RDA y RIPS. Debe disponer de un enlace de datos dedicado y seguridad perimetral en Alta Disponibilidad (HA).' },
    vpn1: { title: 'Túnel IPS <-> Secretaría', desc: 'Fase 1: Conexión mediante VPN Site-to-Site (IPSec) o VPN SSL (Cliente-Sitio). Fase 2: Migración a X-Road.' },
    secSalud: { title: 'Nodo Territorial (Secretaría de Salud)', desc: 'Actúa como intermediario y enrutador obligatorio. Las IPS envían la petición a este nodo, el cual tiene un repositorio territorial propio y se conecta con el MSPS.' },
    vpn2: { title: 'Túnel Secretaría <-> MSPS', desc: 'Conexión VPN Site-to-Site o X-Road en Alta Disponibilidad hacia la plataforma central del Ministerio.' },
    perimetral: { title: 'Seguridad Perimetral MSPS', desc: 'Triple capa: 1) Firewall (Filtro de IPs/Puertos), 2) WAF (Prevención de inyecciones SQL, XSS y CSRF), 3) Balanceador de Cargas para distribuir tráfico.' },
    gateway: { title: 'API Gateway Minsalud', desc: 'Recibe la petición, valida el API Key del prestador y redirecciona la solicitud al repositorio de la Secretaría de Salud correspondiente.' },
    fhir: { title: 'Servidor FHIR & Procesamiento', desc: 'Componente territorial (procesa entrada y distribuye datos), Paciente FHIR (almacena info paciente) y Almacenamiento FHIR (guarda la ubicación de la información del RDA).' },
    validador: { title: 'Validadores Centrales', desc: 'Validador FHIR (revisa la estructura usando perfiles) y Validador de Fuentes Nacionales (Tabla Evolución, REPS, RETHUS). Genera logs de errores si el RDA es rechazado.' },
    terms: { title: 'Servidor Terminológico', desc: 'Dispone de información de las terminologías nacionales en tiempo real como IUM y CIE-10.' },
  };

  protected readonly activeDetail = computed(() => {
    const node = this.activeNode();
    return node ? this.nodeDetails[node] : null;
  });

  protected setNode(key: string | null): void {
    this.activeNode.set(key);
  }
}
