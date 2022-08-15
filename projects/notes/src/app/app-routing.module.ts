import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteListComponent } from './shared/note-list/note-list.component';

const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: '4', loadChildren: () => import('./notes/indicators/wma/wma.module')
    .then(m => m.WmaModule) },
  { path: '3', loadChildren: () => import('./notes/indicators/ema/ema.module')
    .then(m => m.EmaModule) },
  { path: '2', loadChildren: () => import('./notes/indicators/sma/sma.module')
    .then(m => m.SmaModule) },
  { path: '1', loadChildren: () => import('./notes/indicators/frequency-response/frequency-response.module')
    .then(m => m.FrequencyResponseModule) },
  { path: '0', loadChildren: () => import('./notes/data/linear-charting/linear-charting.module')
    .then(m => m.LinearChartingModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'corrected'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
