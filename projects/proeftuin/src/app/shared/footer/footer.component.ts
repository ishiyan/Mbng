import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [MatIcon]
})
export class FooterComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('mbrane-bottom', sanitizer.bypassSecurityTrustResourceUrl('assets/img/mbrane-bottom.svg'));
  }
}
