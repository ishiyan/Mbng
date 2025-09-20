import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'color-disc', loadChildren: () => import('./color-disc/color-disc.routes').then(m => m.routes) },
  { path: 'color-ring', loadChildren: () => import('./color-ring/color-ring.routes').then(m => m.routes) },
  { path: 'color-picker', loadChildren: () => import('./color-picker/color-picker.routes').then(m => m.routes) },
  { path: 'swatches', loadChildren: () => import('./swatches/swatches.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'color-disc' }
];
