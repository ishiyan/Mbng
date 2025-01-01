import { Component, Input } from '@angular/core';

import { Sample } from '../samples/sample';

@Component({
    selector: 'app-tex-sample-list',
    templateUrl: './tex-list.component.html',
    styleUrls: ['./tex-list.component.scss'],
    standalone: false
})
export class TexListComponent {
  @Input() samples!: Sample[];
  @Input()
  showMathJax = true;
  @Input()
  showKatex = true;
}
