import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';







const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-voronoi-1.component').then(m => m.SampleVoronoi1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-voronoi-2.component').then(m => m.SampleVoronoi2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-voronoi-3.component').then(m => m.SampleVoronoi3Component) },
  { path: 's4', loadComponent: () => import('./sample-4/sample-voronoi-4.component').then(m => m.SampleVoronoi4Component) },
  { path: 's5', loadComponent: () => import('./sample-5/sample-voronoi-5.component').then(m => m.SampleVoronoi5Component) },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleVoronoiRoutingModule { }
