import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LineStyle } from './line-style';
import { LineStyleDialogComponent } from './line-style-dialog.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { LineSvgComponent } from './line-svg.component';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'mb-line-style-selector',
    templateUrl: './line-style-selector.component.html',
    styleUrls: ['./line-style-selector.component.scss'],
    imports: [MatFormField, NgIf, MatLabel, LineSvgComponent, MatInput]
})
export class LineStyleSelectorComponent implements OnInit {
  private dialogRef?: MatDialogRef<LineStyleDialogComponent>;
  protected line = new LineStyle();

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<LineStyle> = new EventEmitter<LineStyle>();

  /** Specifies an initial value. */
  @Input() set initial(value: LineStyle) {
    this.line = value;
  }

  /** A label to display above the selector. */
  @Input() label = 'Line style';

  constructor(private dialog: MatDialog){}

  ngOnInit() {
    this.selectionChange.emit(this.line);
  }

  protected openDialog() {
    this.dialogRef = this.dialog.open(LineStyleDialogComponent, { data: this.line });
    this.dialogRef.componentInstance.selectionChange.subscribe((l: LineStyle) => {
      this.line = l;
      this.selectionChange.emit(this.line);
    });
  }
}
