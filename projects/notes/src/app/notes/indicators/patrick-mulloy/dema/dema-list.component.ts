import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams } from 'mb';

import { DemaLengthInput, DemaSmoothingFactorInput } from './dema-input.interface';
import { Dema } from './dema.interface';
import { DemaParamsComponent } from './dema-params.component';

const guardLength = (object: any): object is DoubleExponentialMovingAverageLengthParams => 'length' in object;

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createLengthDema = (showStyle: boolean, len: number, first: boolean, comp?: BarComponent): Dema => {
  const params = {length: len, firstIsAverage: first, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

const createAlphaDema = (showStyle: boolean, sf: number, comp?: BarComponent): Dema => {
  const params = {smoothingFactor: sf, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

@Component({
    selector: 'app-dema-list',
    templateUrl: './dema-list.component.html',
    styleUrls: ['./dema-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgFor,
      MatMiniFabButton,
      MatIcon,
      DemaParamsComponent,
    ]
})
export class DemaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  @Input() set initialLength(init: DemaLengthInput) {
    const arr: Dema[] = [];

    for (let i = 0; i < init.length.length; i++) {
      const dema = createLengthDema(init.showStyle, init.length[i], init.firstIsAverage, init.barComponent);
      dema.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(dema);
    }

    this.demaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the initial indicator array. */
  @Input() set initialSmoothingFactor(init: DemaSmoothingFactorInput) {
    const arr: Dema[] = [];

    for (let i = 0; i < init.smoothingFactor.length; i++) {
      const dema = createAlphaDema(init.showStyle, init.smoothingFactor[i], init.barComponent);
      dema.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(dema);
    }

    this.demaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the input colors. */
  @Input() set colors(inp: string[]) {
    if (inp && inp.length > 0) {
      const arr: Dema[] = [];
      this.colorArray = inp;

      for (let i = 0; i < this.demaArray.length; i++) {
        const dema = {...this.demaArray[i]};
        dema.style.color = inp[i%inp.length];

        arr.push(dema);
      }

      this.demaArray = arr;
    }
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly changed: EventEmitter<Dema[]> = new EventEmitter<Dema[]>();

  protected demaArray: Dema[] = [];
  protected colorArray = ['#ff0000'];

  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.demaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const dema = createLengthDema(showStyle, this.getLastLength() + 5, true, this.defaultBarComponent);

    if (showStyle) {
      dema.style.color = this.colorArray[this.demaArray.length%this.colorArray.length];
    }

    this.demaArray.push(dema);
    this.demaArray = [...this.demaArray];
    this.notify();
  }

  protected updated(dema: Dema): void {
    const i = this.getIndex(dema);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(dema: Dema): void {
    const i = this.getIndex(dema);
    if (i >= 0) {
      this.demaArray.splice(i, 1);
      this.demaArray = [...this.demaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.demaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    if (guardLength(this.demaArray[last].params)) {
      const p = this.demaArray[last].params as DoubleExponentialMovingAverageLengthParams;
      return p.length;
    } else {
      const p = this.demaArray[last].params as DoubleExponentialMovingAverageSmoothingFactorParams;
      const l = Math.ceil(2 / p.smoothingFactor - 1);
      return l;
    }
  }

  private getShowStyle(): boolean {
    if (this.demaArray.length <= 0) {
      return false;
    }

    return this.demaArray[0].showStyle;
  }

  private getIndex(dema: Dema): number {
    for (let i = 0; i < this.demaArray.length; i++) {
      const el = this.demaArray[i];
      if (el === dema) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.demaArray);
    }
  }
}
