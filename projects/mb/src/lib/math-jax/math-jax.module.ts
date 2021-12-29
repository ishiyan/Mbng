import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MathJaxDirective } from './math-jax.directive';
import { ModuleConfiguration } from './module-configuration';
import { MathJaxComponent } from './math-jax.component';

/** Module to load and configure the *MathJax* library. */
@NgModule({
  declarations: [MathJaxDirective, MathJaxComponent],
  imports: [
    CommonModule
  ],
  exports: [MathJaxDirective, MathJaxComponent]
})
export class MathJaxModule {
  constructor(moduleConfig?: ModuleConfiguration) {
    if (moduleConfig) {
      // Insert the MathJax configuration and loader scripts into the Head element.
      MathJaxModule.insertMathJax(moduleConfig);
    }
  }

  /** Configure the module for the root module. */
  public static forRoot(moduleConfiguration: ModuleConfiguration = {
    // '3' mens the latest '3.x.x' version, use '3.2.0' for the specific one.
    version: '3',
    config: 'tex-svg',
    online: true
  }): ModuleWithProviders<MathJaxModule> {
    return {
      ngModule: MathJaxModule,
      providers: [
        { provide: ModuleConfiguration, useValue: moduleConfiguration },
      ]
    };
  }

  /** Configure the module for a child module. */
  public static forChild(): ModuleWithProviders<MathJaxModule> {
    return {
      ngModule: MathJaxModule
    };
  }

  private static insertMathJax(moduleConfig: ModuleConfiguration) {
    const tagId = 'MathJax-script';
    const isScript = document.getElementById(tagId);
    if (isScript) {
      return;
    }

    // Make sure configuration is always before the loader script.
    const config = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        packages: ['base', 'require', 'ams']
      },
      svg: { fontCache: 'global' },
    };

    let script = document.createElement('script') as HTMLScriptElement;
    script.type = 'text/javascript';
    script.text = `MathJax = ${JSON.stringify(config)}`;
    document.getElementsByTagName('head')[0].appendChild(script);

    // The loader script.
    script = document.createElement('script') as HTMLScriptElement;
    script.id = tagId;
    script.type = 'text/javascript';
    script.async = true;
    if (moduleConfig.online) {
      script.src = `https://cdn.jsdelivr.net/npm/mathjax@${moduleConfig.version}/es5/${moduleConfig.config}.js`;
    } else {
      script.src = `assets/mathjax/es5/${moduleConfig.config}.js`;
    }

    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
