import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';

import { FramaInput } from './frama-input.interface';
import { Frama } from './frama.interface';
import { FramaParamsComponent } from './frama-params.component';

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createFrama = (sid: number, showStyle: boolean,
  len: number, alpha: number,
  comp?: BarComponent): Frama => {
  const params = {
    length: len,
    slowestSmoothingFactor: alpha,
    barComponent: comp
  };
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
  selector: 'app-frama-list',
  templateUrl: './frama-list.component.html',
  styleUrls: ['./frama-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    FramaParamsComponent
  ]
})
export class FramaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initial = input<FramaInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Frama[] = [];

        for (let i = 0; i < init.length.length; i++) {
          const frama = createFrama(sid + i, init.showStyle,
            init.length[i], init.slowestSmoothingFactor,
            init.barComponent);
          frama.style.color = this.colorArray[i%this.colorArray.length];
          arr.push(frama);
        }
    
        this.framaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Frama[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.framaArray.length; i++) {
          const frama = {...this.framaArray[i]};
          frama.style.color = inp[i%inp.length];
          frama.id = sid + i;
          arr.push(frama);
        }
  
        this.framaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Frama[]>();

  protected framaArray: Frama[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.framaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const frama = createFrama(
      this.startId + this.framaArray.length,
      showStyle,
      this.getLastLength() + 5,
      0.01,
      this.defaultBarComponent);

    if (showStyle) {
      frama.style.color = this.colorArray[this.framaArray.length%this.colorArray.length];
    }

    this.framaArray.push(frama);
    this.framaArray = [...this.framaArray];
    this.notify();
  }

  protected updated(frama: Frama): void {
    const i = this.getIndex(frama);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(frama: Frama): void {
    const i = this.getIndex(frama);
    if (i >= 0) {
      this.framaArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.framaArray.length; ++j) {
        this.framaArray[j].id = sid + j;
      }
      this.framaArray = [...this.framaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.framaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    return this.framaArray[last].params.length;
  }

  private getShowStyle(): boolean {
    if (this.framaArray.length <= 0) {
      return false;
    }

    return this.framaArray[0].showStyle;
  }

  private getIndex(frama: Frama): number {
    for (let i = 0; i < this.framaArray.length; i++) {
      const el = this.framaArray[i];
      if (el === frama) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.framaArray);
    }
  }
}
