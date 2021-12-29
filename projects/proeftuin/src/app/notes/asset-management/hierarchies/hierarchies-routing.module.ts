import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoComponent } from './demo/demo.component';
import { IndustryClassificationsComponent } from './industry-classifications/industry-classifications.component';

const routes: Routes = [
  { path: 'd1', component: DemoComponent },
  { path: 'd2', component: IndustryClassificationsComponent },
  { path: '**', redirectTo: 'd1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HierarchiesRoutingModule { }
