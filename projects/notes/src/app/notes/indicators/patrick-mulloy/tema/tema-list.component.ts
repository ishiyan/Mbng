import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { TripleExponentialMovingAverageLengthParams, TripleExponentialMovingAverageSmoothingFactorParams } from 'mb';

import { TemaLengthInput, TemaSmoothingFactorInput } from './tema-input.interface';
import { Tema } from './tema.interface';
import { TemaParamsComponent } from './tema-params.component';

const guardLength = (object: any): object is TripleExponentialMovingAverageLengthParams => 'length' in object;

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createLengthTema = (sid: number, showStyle: boolean, len: number, first: boolean, comp?: BarComponent): Tema => {
  const params = {length: len, firstIsAverage: first, barComponent: comp};
  return {
    id: sid,
    params: params,
    style: createStyle(),
    showStyle: showStyle
  };
};

const createAlphaTema = (sid: number, showStyle: boolean, sf: number, comp?: BarComponent): Tema => {
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
  selector: 'app-tema-list',
  templateUrl: './tema-list.component.html',
  styleUrls: ['./tema-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    TemaParamsComponent
  ]
})
export class TemaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initialLength = input<TemaLengthInput>();

  /** Specifies the initial indicator array. */
  readonly initialSmoothingFactor = input<TemaSmoothingFactorInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initialLength();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Tema[] = [];

        for (let i = 0; i < init.length.length; i++) {
          const tema = createLengthTema(sid + i, init.showStyle, init.length[i], init.firstIsAverage, init.barComponent);
          tema.style.color = this.colorArray[i%this.colorArray.length];
          arr.push(tema);
        }
    
        this.temaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const init = this.initialSmoothingFactor();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Tema[] = [];

        for (let i = 0; i < init.smoothingFactor.length; i++) {
          const tema = createAlphaTema(sid + i, init.showStyle, init.smoothingFactor[i], init.barComponent);
          tema.style.color = this.colorArray[i%this.colorArray.length];    
          arr.push(tema);
        }
        
        this.temaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Tema[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.temaArray.length; i++) {
          const ema = {...this.temaArray[i]};
          ema.style.color = inp[i%inp.length];
          ema.id = sid + i;
          arr.push(ema);
        }
  
        this.temaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Tema[]>();

  protected temaArray: Tema[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.temaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const tema = createLengthTema(
      this.startId + this.temaArray.length,
      showStyle,
      this.getLastLength() + 5,
      true,
      this.defaultBarComponent);

    if (showStyle) {
      tema.style.color = this.colorArray[this.temaArray.length%this.colorArray.length];
    }

    this.temaArray.push(tema);
    this.temaArray = [...this.temaArray];
    this.notify();
  }

  protected updated(tema: Tema): void {
    const i = this.getIndex(tema);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(tema: Tema): void {
    const i = this.getIndex(tema);
    if (i >= 0) {
      this.temaArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.temaArray.length; ++j) {
        this.temaArray[j].id = sid + j;
      }
      this.temaArray = [...this.temaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.temaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    if (guardLength(this.temaArray[last].params)) {
      const p = this.temaArray[last].params as TripleExponentialMovingAverageLengthParams;
      return p.length;
    } else {
      const p = this.temaArray[last].params as TripleExponentialMovingAverageSmoothingFactorParams;
      const l = Math.ceil(2 / p.smoothingFactor - 1);
      return l;
    }
  }

  private getShowStyle(): boolean {
    if (this.temaArray.length <= 0) {
      return false;
    }

    return this.temaArray[0].showStyle;
  }

  private getIndex(tema: Tema): number {
    for (let i = 0; i < this.temaArray.length; i++) {
      const el = this.temaArray[i];
      if (el === tema) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.temaArray);
    }
  }
}
