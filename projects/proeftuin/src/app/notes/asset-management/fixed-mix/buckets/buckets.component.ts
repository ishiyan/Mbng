import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fixed-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketsComponent {
}
