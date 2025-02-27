import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-frequency-response-1.component').then(m => m.SampleFrequencyResponse1Component) },
  { path: '**', redirectTo: 's1' }
];
