import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemaComponent } from './tema.component';

const routes: Routes = [
  { path: '', component: TemaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemaRoutingModule { }
