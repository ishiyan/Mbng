import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemaComponent } from './dema.component';

const routes: Routes = [
  { path: '', component: DemaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemaRoutingModule { }
