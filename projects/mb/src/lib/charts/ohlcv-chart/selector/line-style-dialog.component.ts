import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { LineStyle } from './line-style';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { LineStyleComponent } from './line-style.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'mb-line-style-dialog',
    templateUrl: './line-style-dialog.component.html',
    styleUrls: ['./line-style-dialog.component.scss'],
    imports: [CdkScrollable, MatDialogContent, LineStyleComponent, MatDialogActions, MatButton, MatDialogClose, MatIcon]
})
export class LineStyleDialogComponent {
  protected line!: LineStyle;

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<LineStyle> = new EventEmitter<LineStyle>();

  constructor(private dialogRef: MatDialogRef<LineStyleDialogComponent>, @Inject(MAT_DIALOG_DATA) protected data: LineStyle) {
    this.line = data;
  }

  protected changed(style: LineStyle) {
    this.line = style;
    this.selectionChange.emit(this.line);
  }
}
