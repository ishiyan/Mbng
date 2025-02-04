import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule]
})
export class ScrollerComponent {

  showScroller = true; // false;

  @HostListener('window:scroll')
  checkScroll() {
    const showScrollerPosition = 100;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScroller = scrollPosition > showScrollerPosition;
  }

  gotoTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
