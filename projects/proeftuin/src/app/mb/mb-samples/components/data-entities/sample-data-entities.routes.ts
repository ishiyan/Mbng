import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-data-entities-1.component').then(m => m.SampleDataEntities1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-data-entities-2.component').then(m => m.SampleDataEntities2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
