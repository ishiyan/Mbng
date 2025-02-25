import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: 'd1', loadComponent: () => import('./demo/demo.component').then(m => m.DemoComponent) },
  { path: 'd2', loadComponent: () => import('./industry-classifications/industry-classifications.component').then(m => m.IndustryClassificationsComponent) },
  { path: '**', redirectTo: 'd1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HierarchiesRoutingModule { }
