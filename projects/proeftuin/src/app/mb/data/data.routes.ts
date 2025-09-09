import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'entities', loadChildren: () => import('./entities/entities.routes').then(m => m.routes) },
  { path: 'generators', loadChildren: () => import('./generators/generators.routes').then(m => m.routes) },
  { path: 'synthetic-data', loadComponent: () => import('./synthetic-data/synthetic-data.component').then(m => m.SyntheticDataComponent) },
  { path: 'instruments-table', loadComponent: () => import('./instruments-table/instruments-table.component').then(m => m.InstrumentsTableComponent) },
  { path: '**', redirectTo: 'generators' }
];
