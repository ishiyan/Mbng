import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'tex', loadChildren: () => import('./tex/tex.module').then(m => m.TexModule) },
  { path: 'd3', loadChildren: () => import('./d3/d3.module').then(m => m.D3Module) },
  { path: 'mb', loadChildren: () => import('./mb/mb.module').then(m => m.MbModule) },
  { path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule) },
  { path: '**', redirectTo: 'tex', pathMatch: 'full' }
];
