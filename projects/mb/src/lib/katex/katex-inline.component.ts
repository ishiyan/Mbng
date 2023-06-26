import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { KatexOptions } from 'katex';

import { KatexSettingsService } from './katex-settings.service';

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
  host: {'collision-id': 'KatexInlineComponent'}
})
export class KatexInlineComponent implements AfterContentInit {
  protected options: KatexOptions = defaultOptions;
  protected expression = '';
  protected hidden = false;

  constructor(private element: ElementRef, private settings: KatexSettingsService) { }

  ngAfterContentInit(): void {
    this.expression = this.element.nativeElement.innerText;
    this.hidden = true;

    this.settings.sourceObservable().subscribe(s => {
      this.options = { ...defaultOptions, output: s ? 'mathml' : 'html' };
    });
  }
}
