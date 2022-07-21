import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinearChartingComponent } from './linear-charting.component';

const routes: Routes = [
  { path: '', component: LinearChartingComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinearChartingRoutingModule { }
