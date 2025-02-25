import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'tex', loadChildren: () => import('./tex/tex.routes').then(m => m.routes) },
  { path: 'd3', loadChildren: () => import('./d3/d3.routes').then(m => m.routes) },
  { path: 'mb', loadChildren: () => import('./mb/mb.module').then(m => m.MbModule) },
  { path: 'notes', loadChildren: () => import('./notes/notes.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'tex', pathMatch: 'full' }
];
