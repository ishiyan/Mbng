import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'study', loadComponent: () => import('./ohlcv-chart-01-study.component').then(m => m.OhlcvChart01StudyComponent) },
  { path: 'selectors', loadChildren: () => import('./selectors/selectors.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'study' }
];
