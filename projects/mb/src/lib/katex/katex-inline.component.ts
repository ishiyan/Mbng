import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { KatexOptions } from 'katex';

import { KatexSettingsService } from './katex-settings.service';
import { KatexDirective } from './katex.directive';

/** KaTeX settings taken from  https://katex.org/docs/options.html. */
const defaultOptions: KatexOptions = {
  throwOnError: false,
  strict: true,
  displayMode: false,
  output: 'html'
};

/** Component to render a TeX input in inline mode. */
@Component({
    selector: 'mb-ki',
    templateUrl: './katex-inline.component.html',
    styleUrls: ['./katex-inline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [KatexDirective]
})
export class KatexInlineComponent implements AfterContentInit {
  private element = inject(ElementRef);
  private settings = inject(KatexSettingsService);

  protected options: KatexOptions = defaultOptions;
  protected expression = '';
  protected hidden = false;

  ngAfterContentInit(): void {
    this.expression = this.element.nativeElement.innerText;
    this.hidden = true;

    this.settings.sourceObservable().subscribe(s => {
      this.options = { ...defaultOptions, output: s ? 'mathml' : 'html' };
    });
  }
}
