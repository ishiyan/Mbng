import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'mb-dynamic-color-tokens',
  templateUrl: './dynamic-color-tokens.component.html',
  styleUrls: ['./dynamic-color-tokens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDividerModule
  ]
})
export class DynamicColorTokensComponent {
}
