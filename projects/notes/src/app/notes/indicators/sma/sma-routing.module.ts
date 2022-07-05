import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmaComponent } from './sma.component';

const routes: Routes = [
  { path: '', component: SmaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmaRoutingModule { }
