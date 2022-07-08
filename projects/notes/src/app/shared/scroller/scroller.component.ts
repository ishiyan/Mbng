import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent {

  showScroller = true; // false;

  @HostListener('window:scroll')
  checkScroll() {
    const showScrollerPosition = 100;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
console.log("window.scrollY="+window.scrollY+", documentElement.scrollTop="+document.documentElement.scrollTop+", body.scrollTop="+document.body.scrollTop);
    this.showScroller = scrollPosition > showScrollerPosition;
  }

  gotoTop() {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
  }
}
