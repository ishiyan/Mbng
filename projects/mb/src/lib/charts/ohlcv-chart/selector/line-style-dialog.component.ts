import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LineStyle } from './line-style';

@Component({
  selector: 'mb-line-style-dialog',
  templateUrl: './line-style-dialog.component.html',
  styleUrls: ['./line-style-dialog.component.scss']
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
