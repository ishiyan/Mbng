import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KatexOptions } from 'katex';

@Component({
  selector: 'mb-katex',
  templateUrl: './katex.component.html',
  styleUrls: ['./katex.component.scss']
})
export class KatexComponent {
  @Input() expression!: string;
  @Input() options: KatexOptions = {};
  @Output() hasError = new EventEmitter<any>();

  public outputError(error: any): void {
    this.hasError.emit(error);
  }
}
