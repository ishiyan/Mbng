import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';

import { Sample } from '../samples/sample';
import { TexCardComponent } from '../tex-card/tex-card.component';

@Component({
    selector: 'app-tex-sample-list',
    templateUrl: './tex-list.component.html',
    styleUrls: ['./tex-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgFor, TexCardComponent]
})
export class TexListComponent {
  @Input() samples!: Sample[];
  @Input()
  showMathJax = true;
  @Input()
  showKatex = true;
}
