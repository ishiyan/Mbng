import { InjectionToken, Provider } from '@angular/core';

/**
 * Injection token for configuring the storage prefix used by DynamicThemingService.
 * This allows different apps to use unique storage keys to avoid conflicts.
 * 
 * @example
 * ```typescript
 * // In app.config.ts
 * { provide: DYNAMIC_THEMING_STORAGE_PREFIX, useValue: 'notes-app' }
 * ```
 */
export const DYNAMIC_THEMING_STORAGE_PREFIX = new InjectionToken<string>(
  'DynamicThemingStoragePrefix',
  {
    providedIn: 'root',
    factory: () => 'default-app' // Default prefix if not configured
  }
);

/**
 * Provider function for configuring dynamic theming storage prefix.
 * 
 * @param prefix - Unique prefix for localStorage keys (e.g., 'notes-app', 'dashboard-app')
 * @returns Provider configuration
 * 
 * @example
 * ```typescript
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideDynamicThemingStoragePrefix('my-app'),
 *     // ... other providers
 *   ],
 * };
 * ```
 */
export function provideDynamicThemingStoragePrefix(prefix: string): Provider {
  return {
    provide: DYNAMIC_THEMING_STORAGE_PREFIX,
    useValue: prefix
  };
}

