import { Component, Input } from '@angular/core';

import { Sample } from '../samples/sample';

@Component({
  selector: 'tex-sample-list',
  templateUrl: './tex-list.component.html',
  styleUrls: ['./tex-list.component.scss']
})
export class TexListComponent {
  @Input() samples!: Sample[];
  @Input()
  showMathJax = true;
  @Input()
  showKatex = true;
}
