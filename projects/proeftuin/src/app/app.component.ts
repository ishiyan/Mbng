import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
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
