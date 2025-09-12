import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./notes.component').then(m => m.NotesComponent), children: [
      { path: 'am', loadChildren: () => import('./asset-management/asset-management.routes').then(m => m.routes) },
      { path: '**', redirectTo: 'am' }
    ]
  },
  { path: '**', redirectTo: 'am',  pathMatch: 'full' }
];
