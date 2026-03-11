import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Webhook, Network, Key, BookOpen, Activity, AlertTriangle, FileText, Map, Route, Database, Package, Shield, LucideIconData } from 'lucide-angular';

interface MenuItem {
  route: string;
  icon: LucideIconData;
  label: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  protected readonly Activity = Activity;

  protected readonly menuGroups: MenuGroup[] = [
    {
      title: 'Plataforma IHCE',
      items: [
        { route: 'arquitectura', icon: Webhook, label: 'Arquitectura (Mapa)' },
        { route: 'conectividad', icon: Network, label: 'Conectividad y Red' },
        { route: 'autenticacion', icon: Key, label: 'Autenticación (OAuth)' },
        { route: 'endpoints', icon: Webhook, label: 'Endpoints API' },
        { route: 'catalogos', icon: BookOpen, label: 'Catálogos' },
        { route: 'contenido-clinico', icon: Activity, label: 'Contenido Clínico' },
        { route: 'validaciones', icon: AlertTriangle, label: 'Validaciones MUV' },
        { route: 'rips', icon: FileText, label: 'RIPS y FE (Res. 2275)' },
      ],
    },
    {
      title: 'Mapeo RDA (Domicilio)',
      items: [
        { route: 'mapeo-rda', icon: Map, label: 'Guía de Mapeo RDA' },
      ],
    },
    {
      title: 'Flujo de Integración',
      items: [
        { route: 'flujo-api', icon: Route, label: 'Ciclo de Vida API' },
      ],
    },
    {
      title: 'Modelo de Datos',
      items: [
        { route: 'modelo-datos', icon: Database, label: 'Diccionario de Datos' },
        { route: 'estructura-bundle', icon: Package, label: 'Estructura Bundle JSON' },
      ],
    },
    {
      title: 'Ciberseguridad',
      items: [
        { route: 'seguridad', icon: Shield, label: 'Arquitectura y Seguridad' },
      ],
    },
  ];
}
