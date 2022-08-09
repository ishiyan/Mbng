import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrequencyResponseComponent } from './frequency-response.component';

const routes: Routes = [
  { path: '', component: FrequencyResponseComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequencyResponseRoutingModule { }
