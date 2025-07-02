import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-data-generators-1.component').then(m => m.SampleDataGenerators1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-data-generators-2.component').then(m => m.SampleDataGenerators2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
