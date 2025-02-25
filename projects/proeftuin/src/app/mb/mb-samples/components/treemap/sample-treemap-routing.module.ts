import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';







const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-treemap-1.component').then(m => m.SampleTreemap1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-treemap-2.component').then(m => m.SampleTreemap2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-treemap-3.component').then(m => m.SampleTreemap3Component) },
  { path: 's4', loadComponent: () => import('./sample-4/sample-treemap-4.component').then(m => m.SampleTreemap4Component) },
  { path: 's5', loadComponent: () => import('./sample-5/sample-treemap-5.component').then(m => m.SampleTreemap5Component) },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleTreemapRoutingModule { }
