import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { T2ExponentialMovingAverageLengthParams, T2ExponentialMovingAverageSmoothingFactorParams } from 'mb';

import { T2emaLengthInput, T2emaSmoothingFactorInput } from './t2ema-input.interface';
import { T2ema } from './t2ema.interface';
import { T2emaParamsComponent } from './t2ema-params.component';

const guardLength = (object: any): object is T2ExponentialMovingAverageLengthParams => 'length' in object;

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createLengthT2ema = (sid: number, showStyle: boolean, len: number, vf: number, first: boolean, comp?: BarComponent): T2ema => {
  const params = {length: len, vFactor: vf, firstIsAverage: first, barComponent: comp};
  return {
    id: sid,
    params: params,
    style: createStyle(),
    showStyle: showStyle
  };
};

const createAlphaT2ema = (sid: number, showStyle: boolean, sf: number, vf: number, comp?: BarComponent): T2ema => {
  const params = {smoothingFactor: sf, vFactor: vf, barComponent: comp};
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
  selector: 'app-t2ema-list',
  templateUrl: './t2ema-list.component.html',
  styleUrls: ['./t2ema-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    T2emaParamsComponent
  ]
})
export class T2emaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initialLength = input<T2emaLengthInput>();

  /** Specifies the initial indicator array. */
  readonly initialSmoothingFactor = input<T2emaSmoothingFactorInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initialLength();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: T2ema[] = [];

        for (let i = 0; i < init.length.length; i++) {
          const t2ema = createLengthT2ema(sid + i, init.showStyle, init.length[i], init.vFactor, init.firstIsAverage, init.barComponent);
          t2ema.style.color = this.colorArray[i%this.colorArray.length];
          arr.push(t2ema);
        }
    
        this.t2emaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const init = this.initialSmoothingFactor();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: T2ema[] = [];

        for (let i = 0; i < init.smoothingFactor.length; i++) {
          const t2ema = createAlphaT2ema(sid + i, init.showStyle, init.smoothingFactor[i], init.vFactor, init.barComponent);
          t2ema.style.color = this.colorArray[i%this.colorArray.length];    
          arr.push(t2ema);
        }
        
        this.t2emaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: T2ema[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.t2emaArray.length; i++) {
          const ema = {...this.t2emaArray[i]};
          ema.style.color = inp[i%inp.length];
          ema.id = sid + i;
          arr.push(ema);
        }
  
        this.t2emaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<T2ema[]>();

  protected t2emaArray: T2ema[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.t2emaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const t2ema = createLengthT2ema(
      this.startId + this.t2emaArray.length,
      showStyle,
      this.getLastLength() + 5,
      0.7,
      true,
      this.defaultBarComponent);

    if (showStyle) {
      t2ema.style.color = this.colorArray[this.t2emaArray.length%this.colorArray.length];
    }

    this.t2emaArray.push(t2ema);
    this.t2emaArray = [...this.t2emaArray];
    this.notify();
  }

  protected updated(t2ema: T2ema): void {
    const i = this.getIndex(t2ema);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(t2ema: T2ema): void {
    const i = this.getIndex(t2ema);
    if (i >= 0) {
      this.t2emaArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.t2emaArray.length; ++j) {
        this.t2emaArray[j].id = sid + j;
      }
      this.t2emaArray = [...this.t2emaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.t2emaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    if (guardLength(this.t2emaArray[last].params)) {
      const p = this.t2emaArray[last].params as T2ExponentialMovingAverageLengthParams;
      return p.length;
    } else {
      const p = this.t2emaArray[last].params as T2ExponentialMovingAverageSmoothingFactorParams;
      const l = Math.ceil(2 / p.smoothingFactor - 1);
      return l;
    }
  }

  private getShowStyle(): boolean {
    if (this.t2emaArray.length <= 0) {
      return false;
    }

    return this.t2emaArray[0].showStyle;
  }

  private getIndex(t2ema: T2ema): number {
    for (let i = 0; i < this.t2emaArray.length; i++) {
      const el = this.t2emaArray[i];
      if (el === t2ema) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.t2emaArray);
    }
  }
}
