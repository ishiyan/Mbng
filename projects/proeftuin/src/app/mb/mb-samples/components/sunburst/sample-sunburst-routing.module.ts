import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';







const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-sunburst-1.component').then(m => m.SampleSunburst1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-sunburst-2.component').then(m => m.SampleSunburst2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-sunburst-3.component').then(m => m.SampleSunburst3Component) },
  { path: 's4', loadComponent: () => import('./sample-4/sample-sunburst-4.component').then(m => m.SampleSunburst4Component) },
  { path: 's5', loadComponent: () => import('./sample-5/sample-sunburst-5.component').then(m => m.SampleSunburst5Component) },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleSunburstRoutingModule { }
