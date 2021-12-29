import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BucketsComponent } from './buckets/buckets.component';
import { BucketsInteractiveComponent } from './buckets-interactive/buckets-interactive.component';
import { SingleComponent } from './single/single.component';
import { SingleInteractiveComponent } from './single-interactive/single-interactive.component';

const routes: Routes = [
  { path: 's1', component: SingleComponent },
  { path: 's2', component: SingleInteractiveComponent },
  { path: 'b1', component: BucketsComponent },
  { path: 'b2', component: BucketsInteractiveComponent },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedMixRoutingModule { }
