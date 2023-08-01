import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { T2emaComponent } from './t2ema.component';

const routes: Routes = [
  { path: '', component: T2emaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class T2emaRoutingModule { }
