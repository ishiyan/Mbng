import { Component, ChangeDetectionStrategy, input } from '@angular/core';

import { Sample } from '../samples/sample';
import { TexCardComponent } from '../tex-card/tex-card.component';

@Component({
  selector: 'app-tex-sample-list',
  templateUrl: './tex-list.component.html',
  styleUrls: ['./tex-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TexCardComponent]
})
export class TexListComponent {
  readonly samples = input.required<Sample[]>();
  readonly showMathJax = input(true);
  readonly showKatex = input(true);
}
