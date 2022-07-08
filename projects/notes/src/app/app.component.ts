import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

const darkClassName = 'darkMode';
const lightClassName = '';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') className = lightClassName;

  constructor(private overlay: OverlayContainer) { }

  isDarkTheme() {
    return this.className === darkClassName;
  }

  toggleTheme() {
    if (this.className === darkClassName) {
      this.overlay.getContainerElement().classList.remove(darkClassName);
      this.className = lightClassName;
    } else {
      this.overlay.getContainerElement().classList.add(darkClassName);
      this.className = darkClassName;
    }
  }
}
