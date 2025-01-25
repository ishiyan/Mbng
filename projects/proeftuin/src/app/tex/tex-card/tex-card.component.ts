import { Component, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy, inject, viewChild, input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

import { KatexComponent } from 'projects/mb/src/lib/katex/katex.component';
import { MathJaxComponent } from 'projects/mb/src/lib/math-jax/math-jax.component';

import { Sample } from '../samples/sample';

@Component({
  selector: 'app-tex-sample-card',
  templateUrl: './tex-card.component.html',
  styleUrls: ['./tex-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatInput,
    MatFormField,
    TextFieldModule,
    MathJaxComponent,
    KatexComponent
  ]
})
export class TexCardComponent implements AfterViewChecked {
  private changeDetectionRef = inject(ChangeDetectorRef);
  readonly autosize = viewChild.required<CdkTextareaAutosize>('autosize');
  readonly sample = input.required<Sample>();
  readonly showMathJax = input(true);
  readonly showKatex = input(true);

  katexDisplayOptions: any = {displayMode: true, throwOnError: false, strict: true};
  katexInlineOptions: any = {throwOnError: false, strict: true};

  ngAfterViewChecked() {
    this.autosize().resizeToFitContent(true);
    this.changeDetectionRef.detectChanges();
  }

  updateMathJax(text: string) {
    //console.log(this.matJaxDis, text);
  }
}
