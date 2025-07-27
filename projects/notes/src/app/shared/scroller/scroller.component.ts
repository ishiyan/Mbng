import { ChangeDetectionStrategy, PLATFORM_ID, Component, HostListener, inject, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  showScroller = false;

  constructor() {
    effect(() => this.checkScroll());
  }

  @HostListener('document:scroll', ['$event'])
  checkScroll() {
    this.checkScrollPosition();
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  private checkScrollPosition() {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const showScrollerPosition = 100;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScroller = scrollPosition > showScrollerPosition;
  }
}
