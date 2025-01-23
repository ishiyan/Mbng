import { makeEnvironmentProviders } from '@angular/core';

import { MathJaxConfiguration } from './math-jax.configuration';

/**
 * Provide MathJax configuration without using a module.
 */
export function provideMathJax(
    mathJaxConfiguration: MathJaxConfiguration = {
      version: '3',
      config: 'tex-svg',
      online: true
    }
  ) {
    return makeEnvironmentProviders([
      { provide: MathJaxConfiguration, useValue: mathJaxConfiguration }
    ]);
  }
  