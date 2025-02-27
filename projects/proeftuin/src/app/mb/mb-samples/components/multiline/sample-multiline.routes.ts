import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-multiline-1.component').then(m => m.SampleMultiline1Component) },
  { path: '**', redirectTo: 's1' }
];
