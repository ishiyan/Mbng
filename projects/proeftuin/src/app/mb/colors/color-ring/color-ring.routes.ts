import { Routes } from '@angular/router';

import { ColorRing01FeaturesComponent } from './color-ring-01-features.component';
import { ColorRing02PickerComponent } from './color-ring-02-picker.component';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./color-ring-01-features.component').then(m => m.ColorRing01FeaturesComponent) },
  { path: 'picker', loadComponent: () => import('./color-ring-02-picker.component').then(m => m.ColorRing02PickerComponent) },
  { path: '**', redirectTo: 'features' }
];
