import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: '2', loadChildren: () => import('./notes/indicators/sma.module').then(m => m.SmaModule) },
  { path: '1', loadChildren: () => import('./notes/indicators/wma.module').then(m => m.WmaModule) },
  { path: '0', loadChildren: () => import('./notes/indicators/ema.module').then(m => m.EmaModule) },
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
