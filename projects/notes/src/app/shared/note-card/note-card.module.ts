import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';

import { NoteCardComponent } from './note-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [
    NoteCardComponent
  ],
  declarations: [NoteCardComponent]
})
export class NoteCardModule { }
