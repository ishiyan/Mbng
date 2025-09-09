import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./d3.component').then(m => m.D3Component), children: [
      { path: '', loadComponent: () => import('./techan/techan.component').then(m => m.TechanComponent) },
      { path: 'random-barchart', loadComponent: () => import('./random-barchart/random-barchart.component').then(m => m.RandomBarchartComponent) },
      { path: 'draggable-brush', loadComponent: () => import('./draggable-brush/draggable-brush.component').then(m => m.DraggableBrushComponent) },
      { path: 'brush-zoom-areachart', loadComponent: () => import('./brush-zoom-areachart/brush-zoom-areachart.component').then(m => m.BrushZoomAreachartComponent) },
      { path: 'techan', loadComponent: () => import('./techan/techan.component').then(m => m.TechanComponent) },
      { path: 'hilbert-chart', loadComponent: () => import('./hilbert-chart/hilbert-chart.component').then(m => m.HilbertChartComponent) },
      { path: 'horizon-chart', loadComponent: () => import('./horizon-chart/horizon-chart.component').then(m => m.HorizonChartComponent) },
      { path: 'realtime-chart', loadComponent: () => import('./realtime-chart/realtime-chart.component').then(m => m.RealtimeChartComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
