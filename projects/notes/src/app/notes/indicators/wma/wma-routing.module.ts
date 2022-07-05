import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WmaComponent } from './wma.component';

const routes: Routes = [
  { path: '', component: WmaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WmaRoutingModule { }
