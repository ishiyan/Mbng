import { Component, Input, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { MathJaxComponent } from 'projects/mb/src/lib/math-jax/math-jax.component';

import { Sample } from '../samples/sample';

@Component({
    selector: 'app-tex-sample-card',
    templateUrl: './tex-card.component.html',
    styleUrls: ['./tex-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgIf,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardContent,
      MatInput,
      MatFormField,
      TextFieldModule,
      MathJaxComponent,
      KatexModule]
})
export class TexCardComponent implements AfterViewChecked {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @Input()
  sample!: Sample;
  @Input()
  showMathJax = true;
  @Input()
  showKatex = true;

  katexDisplayOptions: any = {displayMode: true, throwOnError: false, strict: true};
  katexInlineOptions: any = {throwOnError: false, strict: true};

  constructor(private changeDetectionRef: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.autosize.resizeToFitContent(true);
    this.changeDetectionRef.detectChanges();
  }

  updateMathJax(text: string) {
    //console.log(this.matJaxDis, text);
  }
}
