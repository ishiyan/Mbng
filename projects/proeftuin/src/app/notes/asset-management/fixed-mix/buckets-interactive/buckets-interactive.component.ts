import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fixed-buckets-interactive',
  templateUrl: './buckets-interactive.component.html',
  styleUrls: ['./buckets-interactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketsInteractiveComponent {
}
