import { Component, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { LineStyle } from './line-style';
import { LineStyleComponent } from './line-style.component';

@Component({
    selector: 'mb-line-style-dialog',
    templateUrl: './line-style-dialog.component.html',
    styleUrls: ['./line-style-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CdkScrollable,
      MatButton,
      MatIcon,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      LineStyleComponent,
    ]
})
export class LineStyleDialogComponent {
  protected data = inject<LineStyle>(MAT_DIALOG_DATA);
  protected line: LineStyle = this.data;

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<LineStyle>();

  protected changed(style: LineStyle) {
    this.line = style;
    this.selectionChange.emit(this.line);
  }
}
