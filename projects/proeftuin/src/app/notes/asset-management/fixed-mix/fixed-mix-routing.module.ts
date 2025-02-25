import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';






const routes: Routes = [
  { path: 's1', loadComponent: () => import('./single/single.component').then(m => m.SingleComponent) },
  { path: 's2', loadComponent: () => import('./single-interactive/single-interactive.component').then(m => m.SingleInteractiveComponent) },
  { path: 'b1', loadComponent: () => import('./buckets/buckets.component').then(m => m.BucketsComponent) },
  { path: 'b2', loadComponent: () => import('./buckets-interactive/buckets-interactive.component').then(m => m.BucketsInteractiveComponent) },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedMixRoutingModule { }
