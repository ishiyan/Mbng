import { Component, Input } from '@angular/core';

import { Sample } from '../samples/sample';
import { NgFor } from '@angular/common';
import { TexCardComponent } from '../tex-card/tex-card.component';

@Component({
    selector: 'app-tex-sample-list',
    templateUrl: './tex-list.component.html',
    styleUrls: ['./tex-list.component.scss'],
    imports: [NgFor, TexCardComponent]
})
export class TexListComponent {
  @Input() samples!: Sample[];
  @Input()
  showMathJax = true;
  @Input()
  showKatex = true;
}
