import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./shared/note-list/note-list.component')
    .then(m => m.NoteListComponent) },
  { path: '11', loadComponent: () => import('./notes/indicators/mark-jurik/jma/jma.component')
    .then(m => m.JmaComponent) },
  { path: '10', loadComponent: () => import('./notes/indicators/perry-kaufman/kama/kama.component')
    .then(m => m.KamaComponent) },
  { path: '9', loadComponent: () => import('./notes/indicators/tim-tillson/t3ema/t3ema.component')
    .then(m => m.T3emaComponent) },
  { path: '8', loadComponent: () => import('./notes/indicators/tim-tillson/t2ema/t2ema.component')
    .then(m => m.T2emaComponent) },
  { path: '7', loadComponent: () => import('./notes/indicators/patrick-mulloy/tema/tema.component')
    .then(m => m.TemaComponent) },
  { path: '6', loadComponent: () => import('./notes/indicators/patrick-mulloy/dema/dema.component')
    .then(m => m.DemaComponent) },
  { path: '5', loadComponent: () => import('./notes/indicators/trima/trima.component')
    .then(m => m.TrimaComponent) },
  { path: '4', loadComponent: () => import('./notes/indicators/wma/wma.component')
    .then(m => m.WmaComponent) },
  { path: '3', loadComponent: () => import('./notes/indicators/ema/ema.component')
    .then(m => m.EmaComponent) },
  { path: '2', loadComponent: () => import('./notes/indicators/sma/sma.component')
    .then(m => m.SmaComponent) },
  { path: '1', loadComponent: () => import('./notes/indicators/frequency-response/frequency-response.component')
    .then(m => m.FrequencyResponseComponent) },
  { path: '0', loadComponent: () => import('./notes/data/linear-charting/linear-charting.component')
    .then(m => m.LinearChartingComponent) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
