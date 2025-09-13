import { mergeApplicationConfig, ApplicationConfig, provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { serverRoutes } from './app.routes.server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideServerRendering(withRoutes(serverRoutes)),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
