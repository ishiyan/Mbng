import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./tex.component').then(m => m.TexComponent), children: [
      { path: '', loadComponent: () => import('./tex-list/tex-list.component').then(m => m.TexListComponent) },
      { path: 'examples', loadComponent: () => import('./tex-list/tex-list.component').then(m => m.TexListComponent) },
      { path: 'basic', loadComponent: () => import('./tex-list/tex-list.component').then(m => m.TexListComponent) },
      { path: 'multiline', loadComponent: () => import('./tex-list/tex-list.component').then(m => m.TexListComponent) },
      { path: 'symbols', loadComponent: () => import('./tex-list/tex-list.component').then(m => m.TexListComponent) },
      { path: 'science', loadComponent: () => import('./tex-list/tex-list.component').then(m => m.TexListComponent) },
      { path: 'synthetic', loadComponent: () => import('./tex-list/tex-list.component').then(m => m.TexListComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
