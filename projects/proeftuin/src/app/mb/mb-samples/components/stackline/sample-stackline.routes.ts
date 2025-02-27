import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-stackline-1.component').then(m => m.SampleStackline1Component) },
  { path: '**', redirectTo: 's1' }
];
