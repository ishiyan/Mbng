import { Component, Input } from '@angular/core';

import { Note } from '../note.interface';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-note-card',
    templateUrl: './note-card.component.html',
    styleUrls: ['./note-card.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, RouterLink, MatCardSubtitle, DatePipe]
})
export class NoteCardComponent {
  @Input()
  note!: Note;
}
