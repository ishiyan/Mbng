import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';

import { NoteCardModule } from '../note-card/note-card.module';
import { NoteListComponent } from './note-list.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule, NoteCardModule
  ],
  exports: [NoteListComponent],
  declarations: [NoteListComponent]
})
export class NoteListModule { }
