import { Component } from '@angular/core';
import { SecondService } from 'projects/mb/src/lib/feature1/second.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notes';

  constructor(secondService: SecondService) {
    this.title = secondService.message;
  }
}
