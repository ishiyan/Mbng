import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';







const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-icicle-1.component').then(m => m.SampleIcicle1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-icicle-2.component').then(m => m.SampleIcicle2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-icicle-3.component').then(m => m.SampleIcicle3Component) },
  { path: 's4', loadComponent: () => import('./sample-4/sample-icicle-4.component').then(m => m.SampleIcicle4Component) },
  { path: 's5', loadComponent: () => import('./sample-5/sample-icicle-5.component').then(m => m.SampleIcicle5Component) },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleIcicleRoutingModule { }
