import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { T3ExponentialMovingAverageLengthParams, T3ExponentialMovingAverageSmoothingFactorParams } from 'mb';

import { T3emaLengthInput, T3emaSmoothingFactorInput } from './t3ema-input.interface';
import { T3ema } from './t3ema.interface';

const guardLength = (object: any): object is T3ExponentialMovingAverageLengthParams => 'length' in object;

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createLengthT3ema = (showStyle: boolean, len: number, vf: number, first: boolean, comp?: BarComponent): T3ema => {
  const params = {length: len, vFactor: vf, firstIsAverage: first, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

const createAlphaT3ema = (showStyle: boolean, sf: number, vf: number, comp?: BarComponent): T3ema => {
  const params = {smoothingFactor: sf, vFactor: vf, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

@Component({
  selector: 'app-t3ema-list',
  templateUrl: './t3ema-list.component.html',
  styleUrls: ['./t3ema-list.component.scss']
})
export class T3emaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  @Input() set initialLength(init: T3emaLengthInput) {
    const arr: T3ema[] = [];

    for (let i = 0; i < init.length.length; i++) {
      const t3ema = createLengthT3ema(init.showStyle, init.length[i], init.vFactor, init.firstIsAverage, init.barComponent);
      t3ema.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(t3ema);
    }

    this.t3emaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the initial indicator array. */
  @Input() set initialSmoothingFactor(init: T3emaSmoothingFactorInput) {
    const arr: T3ema[] = [];

    for (let i = 0; i < init.smoothingFactor.length; i++) {
      const t3ema = createAlphaT3ema(init.showStyle, init.smoothingFactor[i], init.vFactor, init.barComponent);
      t3ema.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(t3ema);
    }

    this.t3emaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the input colors. */
  @Input() set colors(inp: string[]) {
    if (inp && inp.length > 0) {
      const arr: T3ema[] = [];
      this.colorArray = inp;

      for (let i = 0; i < this.t3emaArray.length; i++) {
        const t3ema = {...this.t3emaArray[i]};
        t3ema.style.color = inp[i%inp.length];

        arr.push(t3ema);
      }

      this.t3emaArray = arr;
    }
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly changed: EventEmitter<T3ema[]> = new EventEmitter<T3ema[]>();

  protected t3emaArray: T3ema[] = [];
  protected colorArray = ['#ff0000'];

  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.t3emaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const t3ema = createLengthT3ema(showStyle, this.getLastLength() + 5, 0.7, true, this.defaultBarComponent);

    if (showStyle) {
      t3ema.style.color = this.colorArray[this.t3emaArray.length%this.colorArray.length];
    }

    this.t3emaArray.push(t3ema);
    this.t3emaArray = [...this.t3emaArray];
    this.notify();
  }

  protected updated(t3ema: T3ema): void {
    const i = this.getIndex(t3ema);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(t3ema: T3ema): void {
    const i = this.getIndex(t3ema);
    if (i >= 0) {
      this.t3emaArray.splice(i, 1);
      this.t3emaArray = [...this.t3emaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.t3emaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    if (guardLength(this.t3emaArray[last].params)) {
      const p = this.t3emaArray[last].params as T3ExponentialMovingAverageLengthParams;
      return p.length;
    } else {
      const p = this.t3emaArray[last].params as T3ExponentialMovingAverageSmoothingFactorParams;
      const l = Math.ceil(2 / p.smoothingFactor - 1);
      return l;
    }
  }

  private getShowStyle(): boolean {
    if (this.t3emaArray.length <= 0) {
      return false;
    }

    return this.t3emaArray[0].showStyle;
  }

  private getIndex(t3ema: T3ema): number {
    for (let i = 0; i < this.t3emaArray.length; i++) {
      const el = this.t3emaArray[i];
      if (el === t3ema) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.t3emaArray);
    }
  }
}
