import { Component, output, inject, ChangeDetectionStrategy, effect, input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LineStyle } from './line-style';
import { LineStyleDialogComponent } from './line-style-dialog.component';
import { LineSvgComponent } from './line-svg.component';

@Component({
    selector: 'mb-line-style-selector',
    templateUrl: './line-style-selector.component.html',
    styleUrls: ['./line-style-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatFormField,
      MatLabel,
      MatInput,
      LineSvgComponent,
    ]
})
export class LineStyleSelectorComponent {
  private dialog = inject(MatDialog);

  private dialogRef?: MatDialogRef<LineStyleDialogComponent>;
  protected line = new LineStyle();
  protected currentLabel = 'Line style';

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<LineStyle>();

  /** Specifies an initial value. */
  initial = input.required<LineStyle>();

  /** A label to display above the selector. */
  label = input<string>();

  constructor(){
    effect(() => {
      const lab = this.label();
      if (lab && this.currentLabel !== lab) {
        this.currentLabel = lab;
      }
    });
    effect(() => {
      this.line = this.initial();
    });
  }

  protected openDialog() {
    this.dialogRef = this.dialog.open(LineStyleDialogComponent, { data: this.line });
    this.dialogRef.componentInstance.selectionChange.subscribe((l: LineStyle) => {
      this.line = l;
      this.selectionChange.emit(this.line);
    });
  }
}
