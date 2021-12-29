import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TexComponent } from './tex.component';
import { TexListComponent } from './tex-list/tex-list.component';

const routes: Routes = [
  {
    path: '', component: TexComponent, children: [
      { path: '', component: TexListComponent },
      { path: 'examples', component: TexListComponent },
      { path: 'basic', component: TexListComponent },
      { path: 'multiline', component: TexListComponent },
      { path: 'symbols', component: TexListComponent },
      { path: 'science', component: TexListComponent },
      { path: 'synthetic', component: TexListComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TexRoutingModule { }
