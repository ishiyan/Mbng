import { Component, Input } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';

import { Note } from '../note.interface';
import { notes as initialNotes } from '../../notes';
import { Tag } from '../tag.interface';
import { tags as initialTags } from '../../tags';

const empty = '';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  @Input()
  notes: Note[] = initialNotes;
  tags: Tag[] = initialTags; 
  tagsVisible = false;
  pattern = empty;

  public searchChanged(pat: string): void {
    this.pattern = pat.trim().toLowerCase();
    this.filterNotes();
  }

  public tagsChanged(tag: Tag, event: MatChipSelectionChange) {
    tag.enabled = event.selected;
    this.filterNotes();
  }

  public toggleTag(tag: Tag) {
    tag.enabled = !tag.enabled;
    this.filterNotes();
  }

  public toggleTagsVisibility() {
    this.tagsVisible = !this.tagsVisible;
  }

  protected noTagsEnabled(): boolean {
    for (let i = 0; i < initialTags.length; i++) {
      const t = initialTags[i];
      if (t.enabled) {
        return false;
      }
    }

    return true;
  }

  protected isTagged(n: Note): boolean {
    for (let i = 0; i < initialTags.length; i++) {
      const t = initialTags[i];
      if (t.enabled) {
        for (let j = 0; j < n.tags.length; j++) {
          const s = n.tags[j];
          if (t.title === s) {
            return true;
          }
        }
      }
    }

    return false;
  }

  protected matchesPattern(n: Note, p: string): boolean {
    const s = n.title.trim().toLowerCase();
    return s.includes(p);
  }

  protected filterNotes(): void {
    const p = this.pattern;
    const noTags = this.noTagsEnabled();
    const filteredNotes: Note[] = [];

    for (let i = 0; i < initialNotes.length; i++) {
      const n = initialNotes[i];
      if (noTags || this.isTagged(n)) {
        if (p.length < 1 || this.matchesPattern(n, p)) {
          filteredNotes.push(n);
        }
      }
    }

    this.notes = filteredNotes;
  }
}
