import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DynamicThemingService } from 'projects/mb/src/lib/theming/dynamic-theming.service';
import { LightDarkService } from 'projects/mb/src/lib/theming/light-dark.service'

import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [ToolbarComponent, RouterOutlet, FooterComponent]
})
export class AppComponent {
  // Inject the service to ensure it's instantiated on app startup
  // This will trigger the constructor effects that load and apply stored theme preferences

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private readonly _dynamicThemingService = inject(DynamicThemingService);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private readonly _lightDarkService = inject(LightDarkService);

  // {[route-id], text} pairs
  public toolbarItems: any = {
    ['d3']: 'D3',
    ['tex']: 'TeX',
    ['mb']: 'Mb',
    ['notes']: 'Notes'
  };
}
