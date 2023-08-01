import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { T3emaComponent } from './t3ema.component';

const routes: Routes = [
  { path: '', component: T3emaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class T3emaRoutingModule { }
