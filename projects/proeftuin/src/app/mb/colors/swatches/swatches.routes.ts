import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./swatches-01-features.component').then(m => m.Swatches01FeaturesComponent) },
  { path: 'material-palettes', loadComponent: () => import('./swatches-02-material-palettes.component').then(m => m.Swatches02MaterialPalettesComponent) },
  { path: 'linear-interpolated-palettes', loadComponent: () => import('./swatches-03-linear-interpolated-palettes.component').then(m => m.Swatches03LinearInterpolatedPalettesComponent) },
  { path: 'triple-interpolated-palettes', loadComponent: () => import('./swatches-04-triple-interpolated-palettes.component').then(m => m.Swatches04TripleInterpolatedPalettesComponent) },
  { path: 'random-procedural-palettes', loadComponent: () => import('./swatches-05-random-procedural-palettes.component').then(m => m.Swatches05RandomProceduralPalettesComponent) },
  { path: 'parametric-procedural-palettes', loadComponent: () => import('./swatches-06-parametric-procedural-palettes.component').then(m => m.Swatches06ParametricProceduralPalettesComponent) },
  { path: 'colors-co-palettes', loadComponent: () => import('./swatches-07-colors-co-palettes.component').then(m => m.Swatches07ColorsCoPalettesComponent) },
  { path: 'palettes-from-web', loadComponent: () => import('./swatches-08-palettes-from-web.component').then(m => m.Swatches08PalettesFromWebComponent) },
  { path: 'predefined-interpolated-palettes', loadComponent: () => import('./swatches-09-predefined-interpolated-palettes.component').then(m => m.Swatches09PredefinedInterpolatedPalettesComponent) },
  { path: 'predefined-line-palettes', loadComponent: () => import('./swatches-10-predefined-line-palettes.component').then(m => m.Swatches10PredefinedLinePalettesComponent) },
  { path: 'md3-color-tokens', loadComponent: () => import('./swatches-11-md3-color-tokens.component').then(m => m.Swatches11Md3ColorTokensComponent) },
  { path: '**', redirectTo: 'md3-color-tokens' }
];
