import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', loadComponent: () => import('./notes.component').then(m => m.NotesComponent), children: [
      { path: 'am', loadChildren: () => import('./asset-management/asset-management.module').then(m => m.AssetManagementModule) },
      { path: '**', redirectTo: 'am' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
