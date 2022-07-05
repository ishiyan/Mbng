import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';

import { NoteListComponent } from './note-list.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [NoteListComponent],
  declarations: [NoteListComponent]
})
export class NoteListModule { }
