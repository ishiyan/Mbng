import { Component, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { Sample } from '../samples/sample';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MathJaxModule } from '../../../../../mb/src/lib/math-jax/math-jax.module';
import { KatexModule } from '../../../../../mb/src/lib/katex/katex.module';

@Component({
    selector: 'app-tex-sample-card',
    templateUrl: './tex-card.component.html',
    styleUrls: ['./tex-card.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, NgIf, MathJaxModule, KatexModule]
})
export class TexCardComponent implements AfterViewChecked {
  @Input()
  sample!: Sample;
  @Input()
  showMathJax = true;
  @Input()
  showKatex = true;

  katexDisplayOptions: any = {displayMode: true, throwOnError: false, strict: true};
  katexInlineOptions: any = {throwOnError: false, strict: true};

  constructor(private changeDetectionRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.changeDetectionRef.detectChanges();
  }

  updateMathJax(text: string) {
  }
}
