import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';

import { SmaInput } from './sma-input.interface';
import { Sma } from './sma.interface';

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createSma = (showStyle: boolean, len: number, comp?: BarComponent): Sma => {
  const params = {length: len, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

@Component({
    selector: 'app-sma-list',
    templateUrl: './sma-list.component.html',
    styleUrls: ['./sma-list.component.scss'],
    standalone: false
})
export class SmaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  @Input() set initial(init: SmaInput) {
    const arr: Sma[] = [];

    for (let i = 0; i < init.length.length; i++) {
      const sma = createSma(init.showStyle, init.length[i], init.barComponent);
      sma.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(sma);
    }

    this.smaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the input colors. */
  @Input() set colors(inp: string[]) {
    if (inp && inp.length > 0) {
      const arr: Sma[] = [];
      this.colorArray = inp;

      for (let i = 0; i < this.smaArray.length; i++) {
        const sma = {...this.smaArray[i]};
        sma.style.color = inp[i%inp.length];

        arr.push(sma);
      }

      this.smaArray = arr;
    }
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly changed: EventEmitter<Sma[]> = new EventEmitter<Sma[]>();

  protected smaArray: Sma[] = [];
  protected colorArray = ['#ff0000'];

  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.smaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const sma = createSma(showStyle, this.getLastLength() + 5, this.defaultBarComponent);

    if (showStyle) {
      sma.style.color = this.colorArray[this.smaArray.length%this.colorArray.length];
    }

    this.smaArray.push(sma);
    this.smaArray = [...this.smaArray];
    this.notify();
  }

  protected updated(sma: Sma): void {
    const i = this.getIndex(sma);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(sma: Sma): void {
    const i = this.getIndex(sma);
    if (i >= 0) {
      this.smaArray.splice(i, 1);
      this.smaArray = [...this.smaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.smaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    return this.smaArray[last].params.length;
  }

  private getShowStyle(): boolean {
    if (this.smaArray.length <= 0) {
      return false;
    }

    return this.smaArray[0].showStyle;
  }

  private getIndex(sma: Sma): number {
    for (let i = 0; i < this.smaArray.length; i++) {
      const el = this.smaArray[i];
      if (el === sma) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.smaArray);
    }
  }
}
