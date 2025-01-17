import { Component } from '@angular/core';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [ToolbarComponent, RouterOutlet, FooterComponent]
})
export class AppComponent {
  // {[route-id], text} pairs
  public toolbarItems: any = {
    ['d3']: 'D3',
    ['tex']: 'TeX',
    ['mb']: 'Mb',
    ['notes']: 'Notes'
  };
}
