import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-ohlcv-chart-selector-1.component').then(m => m.SampleOhlcvChartSelector1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-ohlcv-chart-selector-2.component').then(m => m.SampleOhlcvChartSelector2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-ohlcv-chart-selector-3.component').then(m => m.SampleOhlcvChartSelector3Component) },
  { path: 's4', loadComponent: () => import('./sample-4/sample-ohlcv-chart-selector-4.component').then(m => m.SampleOhlcvChartSelector4Component) },
  { path: 's5', loadComponent: () => import('./sample-5/sample-ohlcv-chart-selector-5.component').then(m => m.SampleOhlcvChartSelector5Component) },
  { path: 's6', loadComponent: () => import('./sample-6/sample-ohlcv-chart-selector-6.component').then(m => m.SampleOhlcvChartSelector6Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
