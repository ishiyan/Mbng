import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KatexService } from './katex.service';
import { KatexDirective } from './katex.directive';
import { KatexComponent } from './katex.component';
import { KatexDisplayComponent } from './katex-display.component';
import { KatexInlineComponent } from './katex-inline.component';
import { KatexSettingsService } from './katex-settings.service';

@NgModule({
    imports: [CommonModule, KatexDirective, KatexComponent, KatexDisplayComponent, KatexInlineComponent],
    providers: [KatexService, KatexSettingsService],
    exports: [KatexComponent, KatexDisplayComponent, KatexInlineComponent],
})
export class KatexModule { }
