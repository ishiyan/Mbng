import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-jurik-moving-average-1.component').then(m => m.SampleJurikMovingAverage1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-jurik-moving-average-2.component').then(m => m.SampleJurikMovingAverage2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-jurik-moving-average-3.component').then(m => m.SampleJurikMovingAverage3Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
