import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then(m => m.LayoutComponent),
    children: [
      { path: '', redirectTo: 'arquitectura', pathMatch: 'full' },
      { path: 'arquitectura', loadComponent: () => import('./features/arquitectura/arquitectura').then(m => m.ArquitecturaComponent) },
      { path: 'conectividad', loadComponent: () => import('./features/conectividad/conectividad').then(m => m.ConectividadComponent) },
      { path: 'autenticacion', loadComponent: () => import('./features/autenticacion/autenticacion').then(m => m.AutenticacionComponent) },
      { path: 'endpoints', loadComponent: () => import('./features/endpoints/endpoints').then(m => m.EndpointsComponent) },
      { path: 'catalogos', loadComponent: () => import('./features/catalogos/catalogos').then(m => m.CatalogosComponent) },
      { path: 'contenido-clinico', loadComponent: () => import('./features/contenido-clinico/contenido-clinico').then(m => m.ContenidoClinicoComponent) },
      { path: 'validaciones', loadComponent: () => import('./features/validaciones/validaciones').then(m => m.ValidacionesComponent) },
      { path: 'rips', loadComponent: () => import('./features/rips/rips').then(m => m.RipsComponent) },
      { path: 'mapeo-rda', loadComponent: () => import('./features/mapeo-rda/mapeo-rda').then(m => m.MapeoRdaComponent) },
      { path: 'flujo-api', loadComponent: () => import('./features/flujo-api/flujo-api').then(m => m.FlujoApiComponent) },
      { path: 'modelo-datos', loadComponent: () => import('./features/modelo-datos/modelo-datos').then(m => m.ModeloDatosComponent) },
      { path: 'estructura-bundle', loadComponent: () => import('./features/estructura-bundle/estructura-bundle').then(m => m.EstructuraBundleComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
