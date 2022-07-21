import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NoteCardModule } from '../note-card/note-card.module';
import { NoteListComponent } from './note-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    NoteCardModule
  ],
  exports: [NoteListComponent],
  declarations: [NoteListComponent]
})
export class NoteListModule { }
