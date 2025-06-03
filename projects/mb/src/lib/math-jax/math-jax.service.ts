import { inject, Injectable, PLATFORM_ID, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { MathJaxConfiguration } from './math-jax.configuration';

// Declare MathJax as a global variable so that it can be used in this TypeScript file.
declare global {
  interface Window {
    MathJax: {
      typesetPromise: (_?: any) => Promise<any>;
      promise: Promise<any>;
      isReady: boolean;
      startup: {
        promise: Promise<any>;
        defaultReady: any;
      };
    };
  }
}

const tagId = 'MathJax-script';

@Injectable({
  providedIn: 'root'
})
export class MathJaxService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private config = inject(MathJaxConfiguration);
  private readonly mathJaxLoadingPromise = this.loadMathJax(this.config).catch((err) => {
    console.error('MathJax failed to load', err);
  });

  render(s: string, element: HTMLElement): void {
    this.mathJaxLoadingPromise.then(() => {
      if (MathJaxService.isMathJax(s)) {
        const fixed = MathJaxService.fixMathJaxBugs(s);
        element.innerHTML = `<span class='jax-process'>${fixed}</span>`;
        window.MathJax.startup.promise.then(() => {
          window.MathJax.typesetPromise([element]).catch((err: any) =>
            console.error('MathJax typeset failed: ' + err.message));
        });
      } else {
        element.innerHTML = s;
      }
    });
  }
  
  private static isMathJax(expression: string): boolean {
    return !!expression?.match(/(?:\$|\\\(|\\\[|\\begin\{.*?})/);
  }

  /** Fixes few issues with MathJax strings. */
  private static fixMathJaxBugs(jax: string): string {
    return jax
      // Line break error.
      .replace(/<br \/>/gi, '<br/> ')
      // Automatic breakline.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .replace(/[$]([\s\S]+?)[$]/gi, (m, p: string, _o, _s) =>
        p.includes('\\\\') && !p.includes('\\begin')
          ? `$\\begin{align*}${p}\\end{align*}$`
          : `$${p}$`);
  }

  private isMathJaxLoaded(): boolean {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return false;
    }

    const isScript = document.getElementById(tagId);
    return isScript ? true : false;
  }

  private async loadMathJax(conf: MathJaxConfiguration): Promise<any> {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return Promise.reject("No document object");
    }

    if (this.isMathJaxLoaded()) {
      return Promise.resolve("MathJax already loaded");
    }

    return new Promise((resolve, reject) => {
      // Make sure configuration is always before the loader script.
      const config = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          packages: ['base', 'require', 'ams']
        },
        svg: { fontCache: 'global' },
      };
      const configScript = document.createElement('script') as HTMLScriptElement;
      configScript.type = 'text/javascript';
      configScript.text = `MathJax = ${JSON.stringify(config)}`;
      document.head.appendChild(configScript);

      // The loader script.
      const loaderScript = document.createElement('script') as HTMLScriptElement;
      loaderScript.id = tagId;
      loaderScript.type = 'text/javascript';
      loaderScript.async = true;
      if (conf.online) {
        loaderScript.src = `https://cdn.jsdelivr.net/npm/mathjax@${conf.version}/es5/${conf.config}.js`;
      } else {
        loaderScript.src = `assets/mathjax/es5/${conf.config}.js`;
      }

      // When the script is loaded, resolve the promise.
      loaderScript.onload = () => {
        resolve("MathJax loaded")
      };
      
      // If there's an error, reject the promise.
      loaderScript.onerror = () => {
        reject("Error loading MathJax");
      }
      
      document.head.appendChild(loaderScript);
    });
  }
}

