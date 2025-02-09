import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: '9', renderMode: RenderMode.Prerender },
  { path: '8', renderMode: RenderMode.Prerender },
  { path: '7', renderMode: RenderMode.Prerender },
  { path: '6', renderMode: RenderMode.Prerender },
  { path: '5', renderMode: RenderMode.Prerender },
  { path: '4', renderMode: RenderMode.Prerender },
  { path: '3', renderMode: RenderMode.Prerender },
  { path: '2', renderMode: RenderMode.Prerender },
  { path: '1', renderMode: RenderMode.Prerender },
  { path: '0', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];