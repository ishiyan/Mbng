import { provideNativeDateAdapter } from '@angular/material/core';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';

import { provideDynamicThemingStoragePrefix } from 'projects/mb/src/lib/theming/dynamic-theming-storage-prefix';

import { provideMathJax } from 'projects/mb/src/lib/math-jax/math-jax.provide';
import { MathJaxConfiguration } from 'projects/mb/src/lib/math-jax/math-jax.configuration';
import { routes } from './app.routes';

const mathJaxConfig: MathJaxConfiguration = {
  version: '3',
  //version: '4',
  config: 'tex-svg',
  online: true
};

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()), // otherwise icons do not work
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, inMemoryScrollingFeature, withViewTransitions()),
    //provideAnimationsAsync(),
    provideNativeDateAdapter(), // otherwise date and time pickers don't work
    provideMathJax(mathJaxConfig),
    provideClientHydration(withIncrementalHydration()),
    // Make sure this is consistent with the key used in index.html
    provideDynamicThemingStoragePrefix('proeftuin'),
  ]
};
