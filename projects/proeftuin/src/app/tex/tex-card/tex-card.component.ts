import { Component, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { Sample } from '../samples/sample';

@Component({
  selector: 'tex-sample-card',
  templateUrl: './tex-card.component.html',
  styleUrls: ['./tex-card.component.scss']
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
