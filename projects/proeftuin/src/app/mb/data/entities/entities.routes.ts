import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'bar-component-selector', loadComponent: () => import('./entities-01-bar-component-selector.component').then(m => m.Entities01BarComponentSelectorComponent) },
  { path: 'quote-component-selector', loadComponent: () => import('./entities-02-quote-component-selector.component').then(m => m.Entities02QuoteComponentSelectorComponent) },
  { path: '**', redirectTo: 'bar-component-selector' }
];
