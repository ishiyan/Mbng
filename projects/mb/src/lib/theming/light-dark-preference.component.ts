import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { LightDarkService } from './light-dark.service';

@Component({
  selector: 'mb-light-dark-preference',
  templateUrl: './light-dark-preference.component.html',
  styleUrls: ['./light-dark-preference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatSlideToggle
  ]
})
export class LightDarkPreferenceComponent {
  protected readonly svc = inject(LightDarkService);
}