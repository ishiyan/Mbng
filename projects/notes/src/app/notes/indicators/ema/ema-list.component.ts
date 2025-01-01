import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { ExponentialMovingAverageLengthParams, ExponentialMovingAverageSmoothingFactorParams } from 'mb';

import { EmaLengthInput, EmaSmoothingFactorInput } from './ema-input.interface';
import { Ema } from './ema.interface';

const guardLength = (object: any): object is ExponentialMovingAverageLengthParams => 'length' in object;

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createLengthEma = (showStyle: boolean, len: number, first: boolean, comp?: BarComponent): Ema => {
  const params = {length: len, firstIsAverage: first, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

const createAlphaEma = (showStyle: boolean, sf: number, comp?: BarComponent): Ema => {
  const params = {smoothingFactor: sf, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

@Component({
    selector: 'app-ema-list',
    templateUrl: './ema-list.component.html',
    styleUrls: ['./ema-list.component.scss'],
    standalone: false
})
export class EmaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  @Input() set initialLength(init: EmaLengthInput) {
    const arr: Ema[] = [];

    for (let i = 0; i < init.length.length; i++) {
      const ema = createLengthEma(init.showStyle, init.length[i], init.firstIsAverage, init.barComponent);
      ema.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(ema);
    }

    this.emaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the initial indicator array. */
  @Input() set initialSmoothingFactor(init: EmaSmoothingFactorInput) {
    const arr: Ema[] = [];

    for (let i = 0; i < init.smoothingFactor.length; i++) {
      const ema = createAlphaEma(init.showStyle, init.smoothingFactor[i], init.barComponent);
      ema.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(ema);
    }

    this.emaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the input colors. */
  @Input() set colors(inp: string[]) {
    if (inp && inp.length > 0) {
      const arr: Ema[] = [];
      this.colorArray = inp;

      for (let i = 0; i < this.emaArray.length; i++) {
        const ema = {...this.emaArray[i]};
        ema.style.color = inp[i%inp.length];

        arr.push(ema);
      }

      this.emaArray = arr;
    }
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly changed: EventEmitter<Ema[]> = new EventEmitter<Ema[]>();

  protected emaArray: Ema[] = [];
  protected colorArray = ['#ff0000'];

  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.emaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const ema = createLengthEma(showStyle, this.getLastLength() + 5, true, this.defaultBarComponent);

    if (showStyle) {
      ema.style.color = this.colorArray[this.emaArray.length%this.colorArray.length];
    }

    this.emaArray.push(ema);
    this.emaArray = [...this.emaArray];
    this.notify();
  }

  protected updated(ema: Ema): void {
    const i = this.getIndex(ema);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(ema: Ema): void {
    const i = this.getIndex(ema);
    if (i >= 0) {
      this.emaArray.splice(i, 1);
      this.emaArray = [...this.emaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.emaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    if (guardLength(this.emaArray[last].params)) {
      const p = this.emaArray[last].params as ExponentialMovingAverageLengthParams;
      return p.length;
    } else {
      const p = this.emaArray[last].params as ExponentialMovingAverageSmoothingFactorParams;
      const l = Math.ceil(2 / p.smoothingFactor - 1);
      return l;
    }
  }

  private getShowStyle(): boolean {
    if (this.emaArray.length <= 0) {
      return false;
    }

    return this.emaArray[0].showStyle;
  }

  private getIndex(ema: Ema): number {
    for (let i = 0; i < this.emaArray.length; i++) {
      const el = this.emaArray[i];
      if (el === ema) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.emaArray);
    }
  }
}
