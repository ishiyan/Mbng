import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MathJaxModule } from 'projects/mb/src/lib/math-jax/math-jax.module';
import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { MaterialModule } from 'projects/mb/src/lib/material/material.module';

import { FooterModule } from '../shared/footer/footer.module';
import { TexRoutingModule } from './tex-routing.module';
import { TexComponent } from './tex.component';
import { TexListComponent } from './tex-list/tex-list.component';
import { TexCardComponent } from './tex-card/tex-card.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, FlexLayoutModule,
    TexRoutingModule, MaterialModule, FooterModule, MathJaxModule.forChild(), KatexModule
  ],
  declarations: [TexComponent, TexListComponent, TexCardComponent]
})
export class TexModule { }
