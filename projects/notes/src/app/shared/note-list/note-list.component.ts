import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatChipSelectionChange, MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatToolbar } from '@angular/material/toolbar';

import { Note } from '../note.interface';
import { notes as initialNotes } from '../../notes';
import { Tag } from '../tag.interface';
import { tags as initialTags } from '../../tags';
import { NoteCardComponent } from '../note-card/note-card.component';

const empty = '';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatPrefix,
    MatSuffix,
    MatInput,
    MatIcon,
    MatIconButton,
    MatChipListbox,
    MatChipOption,
    MatToolbar,
    NoteCardComponent
  ]
})
export class NoteListComponent {
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
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
