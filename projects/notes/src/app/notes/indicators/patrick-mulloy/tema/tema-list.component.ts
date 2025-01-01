import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { TripleExponentialMovingAverageLengthParams, TripleExponentialMovingAverageSmoothingFactorParams } from 'mb';

import { TemaLengthInput, TemaSmoothingFactorInput } from './tema-input.interface';
import { Tema } from './tema.interface';

const guardLength = (object: any): object is TripleExponentialMovingAverageLengthParams => 'length' in object;

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createLengthTema = (showStyle: boolean, len: number, first: boolean, comp?: BarComponent): Tema => {
  const params = {length: len, firstIsAverage: first, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

const createAlphaTema = (showStyle: boolean, sf: number, comp?: BarComponent): Tema => {
  const params = {smoothingFactor: sf, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

@Component({
    selector: 'app-tema-list',
    templateUrl: './tema-list.component.html',
    styleUrls: ['./tema-list.component.scss'],
    standalone: false
})
export class TemaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  @Input() set initialLength(init: TemaLengthInput) {
    const arr: Tema[] = [];

    for (let i = 0; i < init.length.length; i++) {
      const tema = createLengthTema(init.showStyle, init.length[i], init.firstIsAverage, init.barComponent);
      tema.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(tema);
    }

    this.temaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the initial indicator array. */
  @Input() set initialSmoothingFactor(init: TemaSmoothingFactorInput) {
    const arr: Tema[] = [];

    for (let i = 0; i < init.smoothingFactor.length; i++) {
      const tema = createAlphaTema(init.showStyle, init.smoothingFactor[i], init.barComponent);
      tema.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(tema);
    }

    this.temaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the input colors. */
  @Input() set colors(inp: string[]) {
    if (inp && inp.length > 0) {
      const arr: Tema[] = [];
      this.colorArray = inp;

      for (let i = 0; i < this.temaArray.length; i++) {
        const tema = {...this.temaArray[i]};
        tema.style.color = inp[i%inp.length];

        arr.push(tema);
      }

      this.temaArray = arr;
    }
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly changed: EventEmitter<Tema[]> = new EventEmitter<Tema[]>();

  protected temaArray: Tema[] = [];
  protected colorArray = ['#ff0000'];

  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.temaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const tema = createLengthTema(showStyle, this.getLastLength() + 5, true, this.defaultBarComponent);

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
