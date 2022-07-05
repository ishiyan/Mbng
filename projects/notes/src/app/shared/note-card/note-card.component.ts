import { Component, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { Note } from '../notes/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements AfterViewChecked {
  @Input()
  note!: Note;

  constructor(private changeDetectionRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.changeDetectionRef.detectChanges();
  }
}
