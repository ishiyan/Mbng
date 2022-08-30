import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { BarComponentComponent } from './bar-component.component';
import { QuoteComponentComponent } from './quote-component.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    exports: [
        BarComponentComponent,
        QuoteComponentComponent
    ],
    declarations: [
        BarComponentComponent,
        QuoteComponentComponent
    ]
})
export class EntitiesModule { }
