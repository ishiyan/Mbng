import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmaComponent } from './ema.component';

const routes: Routes = [
  { path: '', component: EmaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmaRoutingModule { }
