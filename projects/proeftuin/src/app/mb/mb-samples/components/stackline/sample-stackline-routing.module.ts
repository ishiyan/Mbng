import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-stackline-1.component').then(m => m.SampleStackline1Component) },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleStacklineRoutingModule { }
