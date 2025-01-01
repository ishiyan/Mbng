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
    styleUrls: ['./note-list.component.scss'],
    standalone: false
})
export class NoteListComponent {
  @Input()
  notes: Note[] = initialNotes;

  protected tags: Tag[] = initialTags;
  protected tagsVisible = false;
  protected pattern = empty;

  protected searchChanged(pat: string): void {
    this.pattern = pat.trim().toLowerCase();
    this.filterNotes();
  }

  protected tagsChanged(tag: Tag, event: MatChipSelectionChange): void {
    tag.enabled = event.selected;
    this.filterNotes();
  }

  protected toggleTag(tag: Tag): void {
    tag.enabled = !tag.enabled;
    this.filterNotes();
  }

  protected toggleTagsVisibility(): void {
    this.tagsVisible = !this.tagsVisible;
  }

  protected noTagsEnabled(): boolean {
    for (const t of initialTags) {
      if (t.enabled) {
        return false;
      }
    }

    return true;
  }

  protected isTagged(n: Note): boolean {
    for (const t of initialTags) {
      if (t.enabled) {
        for (const s of n.tags) {
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

    for (const n of initialNotes) {
      if (noTags || this.isTagged(n)) {
        if (p.length < 1 || this.matchesPattern(n, p)) {
          filteredNotes.push(n);
        }
      }
    }

    this.notes = filteredNotes;
  }
}
