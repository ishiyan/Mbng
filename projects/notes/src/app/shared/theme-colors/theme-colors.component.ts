import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-theme-colors',
  templateUrl: './theme-colors.component.html',
  styleUrls: ['./theme-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDividerModule]
})
export class ThemeColorsComponent {
}
