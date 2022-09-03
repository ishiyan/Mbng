import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LineData } from '../template/line-data';

@Component({
  selector: 'mb-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  protected line = new LineData();

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<LineData> = new EventEmitter<LineData>();

  /** Specifies an initial value. */
  @Input() set initial(line: LineData) {
    this.line = line;
  }

  ngOnInit() {
    this.selectionChange.emit(this.line);
  }

  protected widthChanged(width: number) {
    this.line.width = width;
    this.selectionChange.emit(this.line);
  }

  protected dashChanged(dash: string) {
    this.line.dash = dash;
    this.selectionChange.emit(this.line);
  }

  protected interpolationChanged(interpolation: string) {
    this.line.interpolation = interpolation;
    this.selectionChange.emit(this.line);
  }
}
