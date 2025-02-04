import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

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

const createLengthDema = (sid: number, showStyle: boolean, len: number, first: boolean, comp?: BarComponent): Dema => {
  const params = {length: len, firstIsAverage: first, barComponent: comp};
  return {
    id: sid,
    params: params,
    style: createStyle(),
    showStyle: showStyle
  };
};

const createAlphaDema = (sid: number, showStyle: boolean, sf: number, comp?: BarComponent): Dema => {
  const params = {smoothingFactor: sf, barComponent: comp};
  return {
    id: sid,
    params: params,
    style: createStyle(),
    showStyle: showStyle
  };
};

function inc(n: number): number {
  return n === 1000 ? 0 : 1000;
}

@Component({
  selector: 'app-dema-list',
  templateUrl: './dema-list.component.html',
  styleUrls: ['./dema-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    DemaParamsComponent
  ]
})
export class DemaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initialLength = input<DemaLengthInput>();

  /** Specifies the initial indicator array. */
  readonly initialSmoothingFactor = input<DemaSmoothingFactorInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initialLength();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Dema[] = [];

        for (let i = 0; i < init.length.length; i++) {
          const dema = createLengthDema(sid + i, init.showStyle, init.length[i], init.firstIsAverage, init.barComponent);
          dema.style.color = this.colorArray[i%this.colorArray.length];
          arr.push(dema);
        }
    
        this.demaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const init = this.initialSmoothingFactor();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Dema[] = [];

        for (let i = 0; i < init.smoothingFactor.length; i++) {
          const dema = createAlphaDema(sid + i, init.showStyle, init.smoothingFactor[i], init.barComponent);
          dema.style.color = this.colorArray[i%this.colorArray.length];    
          arr.push(dema);
        }
        
        this.demaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Dema[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.demaArray.length; i++) {
          const ema = {...this.demaArray[i]};
          ema.style.color = inp[i%inp.length];
          ema.id = sid + i;
          arr.push(ema);
        }
  
        this.demaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Dema[]>();

  protected demaArray: Dema[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.demaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const dema = createLengthDema(
      this.startId + this.demaArray.length,
      showStyle,
      this.getLastLength() + 5,
      true,
      this.defaultBarComponent);

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
      const sid = this.startId;
      for (let j = i; j < this.demaArray.length; ++j) {
        this.demaArray[j].id = sid + j;
      }
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
