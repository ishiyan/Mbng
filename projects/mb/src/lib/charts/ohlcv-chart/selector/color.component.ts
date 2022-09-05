import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mb-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  private value = '#000000';

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<string> = new EventEmitter<string>();

  /** A label to display above the selector. */
  @Input() label = '';

  /** Specifies an initial value. */
  @Input() set initial(color: string) {
    this.value = color;
  }

  protected set color(value: string) {
    if (this.value !== value) {
      this.value = value;
      this.selectionChange.emit(this.value);
    }
  }

  protected get color(): string {
    return this.value;
  }

  ngOnInit() {
    this.selectionChange.emit(this.value);
  }
}
