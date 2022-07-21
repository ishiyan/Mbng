import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { NoteCardComponent } from './note-card.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [
    NoteCardComponent
  ],
  declarations: [NoteCardComponent]
})
export class NoteCardModule { }
