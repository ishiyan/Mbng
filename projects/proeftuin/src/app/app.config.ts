import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';

import { provideMathJax } from 'projects/mb/src/lib/math-jax/math-jax.provide';
import { MathJaxConfiguration } from 'projects/mb/src/lib/math-jax/math-jax.configuration';
import { routes } from './app.routes';

const mathJaxConfig: MathJaxConfiguration = {
  version: '3',
  config: 'tex-svg',
  online: false
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // otherwise icons do not work
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    provideMathJax(mathJaxConfig),
    /*provideMathJax({
      version: '3',
      config: 'tex-svg',
      online: true
    }),*/
    /*{ provide: MathJaxConfiguration, useValue: {
      version: '3',
      config: 'tex-svg',
      online: false
    }},*/
    provideNativeDateAdapter(), // otherwise date and time pickers don't work
    provideAnimationsAsync()]
};
