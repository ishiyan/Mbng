import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';

import { TrimaInput } from './trima-input.interface';
import { Trima } from './trima.interface';
import { TrimaParamsComponent } from './trima-params.component';

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createTrima = (sid: number, showStyle: boolean, len: number, comp?: BarComponent): Trima => {
  const params = {length: len, barComponent: comp};
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
  selector: 'app-trima-list',
  templateUrl: './trima-list.component.html',
  styleUrls: ['./trima-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    TrimaParamsComponent
  ]
})
export class TrimaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initial = input<TrimaInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Trima[] = [];

        for (let i = 0; i < init.length.length; i++) {
          const trima = createTrima(sid + i, init.showStyle, init.length[i], init.barComponent);
          trima.style.color = this.colorArray[i%this.colorArray.length];    
          arr.push(trima);
        }
    
        this.trimaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Trima[] = [];
        this.colorArray = inp;

        for (let i = 0; i < this.trimaArray.length; i++) {
          const trima = {...this.trimaArray[i]};
          trima.style.color = inp[i%inp.length];  
          trima.id = sid + i;  
          arr.push(trima);
        }
  
        this.trimaArray = arr;
      }
      });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Trima[]>();

  protected trimaArray: Trima[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.trimaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const trima = createTrima(
      this.startId + this.trimaArray.length,
      showStyle,
      this.getLastLength() + 5,
      this.defaultBarComponent);

    if (showStyle) {
      trima.style.color = this.colorArray[this.trimaArray.length%this.colorArray.length];
    }

    this.trimaArray.push(trima);
    this.trimaArray = [...this.trimaArray];
    this.notify();
  }

  protected updated(trima: Trima): void {
    const i = this.getIndex(trima);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(trima: Trima): void {
    const i = this.getIndex(trima);
    if (i >= 0) {
      this.trimaArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.trimaArray.length; ++j) {
        this.trimaArray[j].id = sid + j;
      }
      this.trimaArray = [...this.trimaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.trimaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    return this.trimaArray[last].params.length;
  }

  private getShowStyle(): boolean {
    if (this.trimaArray.length <= 0) {
      return false;
    }

    return this.trimaArray[0].showStyle;
  }

  private getIndex(trima: Trima): number {
    for (let i = 0; i < this.trimaArray.length; i++) {
      const el = this.trimaArray[i];
      if (el === trima) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.trimaArray);
    }
  }
}
