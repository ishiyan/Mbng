import { Component } from '@angular/core';

import { Tag } from './shared/tag';
import { tags } from './tags';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mytags: Tag[] = tags
}
