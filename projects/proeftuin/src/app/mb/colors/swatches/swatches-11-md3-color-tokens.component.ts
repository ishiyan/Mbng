import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';

import { DynamicColorTokensComponent } from 'projects/mb/src/lib/theming/dynamic-color-tokens.component';

@Component({
  selector: 'app-mb-swatches-11-md3-color-tokens',
  templateUrl: './swatches-11-md3-color-tokens.component.html',
  styleUrls: ['./swatches-11-md3-color-tokens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    DynamicColorTokensComponent
  ]
})
export class Swatches11Md3ColorTokensComponent {
}
