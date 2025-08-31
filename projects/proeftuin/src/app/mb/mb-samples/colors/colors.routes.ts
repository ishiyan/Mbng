import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'color-disc-01', loadComponent: () => import('./color-disc/color-disc-01.component').then(m => m.ColorDisc01Component) },
  { path: 'color-disc-picker-01', loadComponent: () => import('./color-disc/color-disc-picker-01.component').then(m => m.ColorDiscPicker01Component) },
  { path: '**', redirectTo: 'color-disc-01' }
];
