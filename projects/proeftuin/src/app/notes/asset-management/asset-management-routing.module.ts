import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'fm', loadChildren: () => import('./fixed-mix/fixed-mix.module').then(m => m.FixedMixModule) },
  { path: 'hi', loadChildren: () => import('./hierarchies/hierarchies.module').then(m => m.HierarchiesModule) },
  { path: '**', redirectTo: 'fm' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
