import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrimaComponent } from './trima.component';

const routes: Routes = [
  { path: '', component: TrimaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrimaRoutingModule { }
