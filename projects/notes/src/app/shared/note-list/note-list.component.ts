import { Component, Input } from '@angular/core';

import { Note } from '../note';
import { notes as initialNotes } from '../../notes/notes';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  @Input() notes: Note[] = initialNotes;
}
