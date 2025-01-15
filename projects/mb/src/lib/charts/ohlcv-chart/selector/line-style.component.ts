import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LineStyle } from './line-style';
import { LineWidthComponent } from './line-width.component';
import { LineDashComponent } from './line-dash.component';
import { LineInterpolationComponent } from './line-interpolation.component';
import { ColorComponent } from './color.component';

@Component({
    selector: 'mb-line-style',
    templateUrl: './line-style.component.html',
    styleUrls: ['./line-style.component.scss'],
    imports: [LineWidthComponent, LineDashComponent, LineInterpolationComponent, ColorComponent]
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
