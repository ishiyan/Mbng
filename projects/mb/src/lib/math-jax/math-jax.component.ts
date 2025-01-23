import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { MathJaxDirective } from './math-jax.directive';
import { MathJaxConfiguration } from './math-jax.configuration';

@Component({
    selector: 'mb-mathjax',
    templateUrl: './math-jax.component.html',
    styleUrls: ['./math-jax.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MathJaxDirective]
})
export class MathJaxComponent implements OnChanges, OnInit {
  private config = inject(MathJaxConfiguration);

  @Input() expression!: string;

  @ViewChild(MathJaxDirective) mathJaxDirective!: MathJaxDirective;

  ngOnInit(): void {
    // console.log('MathJaxConfiguration:', this.config);
    if (this.config) {
      // Insert the MathJax configuration or scripts if needed.
      this.insertMathJax(this.config);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('OnChanges:', this.mathJaxDirective, this.expression);
    if (this.mathJaxDirective) {
      this.mathJaxDirective.typeset(this.expression);
    }
  }

  private insertMathJax(mathJaxConfig: MathJaxConfiguration) {
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
    if (mathJaxConfig.online) {
      script.src = `https://cdn.jsdelivr.net/npm/mathjax@${mathJaxConfig.version}/es5/${mathJaxConfig.config}.js`;
    } else {
      script.src = `assets/mathjax/es5/${mathJaxConfig.config}.js`;
    }

    document.getElementsByTagName('head')[0].appendChild(script);
  } 
}
