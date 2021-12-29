import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { D3Component } from './d3.component';
import { Sample1Component } from './d3-samples/sample-1/sample-1.component';
import { Sample2Component } from './d3-samples/sample-2/sample-2.component';
import { Sample3Component } from './d3-samples/sample-3/sample-3.component';
import { Sample4Component } from './d3-samples/sample-4/sample-4.component';
import { Sample5Component } from './d3-samples/sample-5/sample-5.component';
import { Sample6Component } from './d3-samples/sample-6/sample-6.component';
import { Sample7Component } from './d3-samples/sample-7/sample-7.component';
import { Sample8Component } from './d3-samples/sample-8/sample-8.component';

const routes: Routes = [
  {
    path: '', component: D3Component, children: [
      { path: '', component: Sample5Component },
      { path: 'sample-1', component: Sample1Component },
      { path: 'sample-2', component: Sample2Component },
      { path: 'sample-3', component: Sample3Component },
      { path: 'sample-4', component: Sample4Component },
      { path: 'sample-5', component: Sample5Component },
      { path: 'sample-6', component: Sample6Component },
      { path: 'sample-7', component: Sample7Component },
      { path: 'sample-8', component: Sample8Component }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3RoutingModule { }
