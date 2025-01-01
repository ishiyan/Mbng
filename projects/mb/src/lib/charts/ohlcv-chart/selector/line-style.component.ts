import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LineStyle } from './line-style';

@Component({
    selector: 'mb-line-style',
    templateUrl: './line-style.component.html',
    styleUrls: ['./line-style.component.scss'],
    standalone: false
})
export class LineStyleComponent implements OnInit {

  protected line = new LineStyle();

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<LineStyle> = new EventEmitter<LineStyle>();

  /** Specifies an initial value. */
  @Input() set initial(line: LineStyle) {
    this.line = line;
  }

  ngOnInit() {
    this.selectionChange.emit(this.line);
  }

  protected widthChanged(width: number) {
    this.line.width = width;
    this.line = { ...this.line };
    this.selectionChange.emit(this.line);
  }

  protected dashChanged(dash: string) {
    this.line.dash = dash;
    this.line = { ...this.line };
    this.selectionChange.emit(this.line);
  }

  protected colorChanged(color: string) {
    this.line.color = color;
    this.line = { ...this.line };
    this.selectionChange.emit(this.line);
  }

  protected interpolationChanged(interpolation: string) {
    this.line.interpolation = interpolation;
    this.line = { ...this.line };
    this.selectionChange.emit(this.line);
  }
}
