import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'line-width', loadComponent: () => import('./ohlcv-chart-selectors-01-line-width.component').then(m => m.OhlcvChartSelectors01LineWidthComponent) },
  { path: 'line-dash', loadComponent: () => import('./ohlcv-chart-selectors-02-line-dash.component').then(m => m.OhlcvChartSelectors02LineDashComponent) },
  { path: 'line-interpolation', loadComponent: () => import('./ohlcv-chart-selectors-03-line-interpolation.component').then(m => m.OhlcvChartSelectors03LineInterpolationComponent) },
  { path: 'color', loadComponent: () => import('./ohlcv-chart-selectors-04-color.component').then(m => m.OhlcvChartSelectors04ColorComponent) },
  { path: 'line-style', loadComponent: () => import('./ohlcv-chart-selectors-05-line-style.component').then(m => m.OhlcvChartSelectors05LineStyleComponent) },
  { path: 'line-selector', loadComponent: () => import('./ohlcv-chart-selectors-06-line-selector.component').then(m => m.OhlcvChartSelectors06LineSelectorComponent) },
  { path: '**', redirectTo: 'line-selector' }
];
