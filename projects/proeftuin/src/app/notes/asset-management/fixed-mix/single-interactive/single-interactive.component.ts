import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fixed-single-interactive',
  templateUrl: './single-interactive.component.html',
  styleUrls: ['./single-interactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleInteractiveComponent {
}
