import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KatexOptions } from 'katex';
import { KatexDirective } from './katex.directive';

@Component({
    selector: 'mb-katex',
    templateUrl: './katex.component.html',
    styleUrls: ['./katex.component.scss'],
    host: { 'collision-id': 'KatexComponent' },
    imports: [KatexDirective]
})
export class KatexComponent {
  @Input() expression!: string;
  @Input() options: KatexOptions = {};
  @Output() hasError = new EventEmitter<any>();

  public outputError(error: any): void {
    this.hasError.emit(error);
  }
}
