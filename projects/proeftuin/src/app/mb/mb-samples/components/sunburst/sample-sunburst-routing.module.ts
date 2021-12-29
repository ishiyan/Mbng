import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleSunburst1Component } from './sample-1/sample-sunburst-1.component';
import { SampleSunburst2Component } from './sample-2/sample-sunburst-2.component';
import { SampleSunburst3Component } from './sample-3/sample-sunburst-3.component';
import { SampleSunburst4Component } from './sample-4/sample-sunburst-4.component';
import { SampleSunburst5Component } from './sample-5/sample-sunburst-5.component';

const routes: Routes = [
  { path: 's1', component: SampleSunburst1Component },
  { path: 's2', component: SampleSunburst2Component },
  { path: 's3', component: SampleSunburst3Component },
  { path: 's4', component: SampleSunburst4Component },
  { path: 's5', component: SampleSunburst5Component },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleSunburstRoutingModule { }
