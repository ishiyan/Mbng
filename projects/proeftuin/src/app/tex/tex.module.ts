import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TexComponent } from './tex.component';
import { TexListComponent } from './tex-list/tex-list.component';
import { TexCardComponent } from './tex-card/tex-card.component';

@NgModule({
    imports: [
    CommonModule, FormsModule, FlexLayoutModule,
    TexComponent, TexListComponent, TexCardComponent
]
})
export class TexModule { }
