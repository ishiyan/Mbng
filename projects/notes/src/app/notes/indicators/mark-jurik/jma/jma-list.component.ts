import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';

import { JmaInput } from './jma-input.interface';
import { Jma } from './jma.interface';
import { JmaParamsComponent } from './jma-params.component';

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createJma = (sid: number, showStyle: boolean,
  length: number, phase: number,
  comp?: BarComponent): Jma => {
  const params = {
    length: length,
    phase: phase,
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
  selector: 'app-jma-list',
  templateUrl: './jma-list.component.html',
  styleUrls: ['./jma-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    JmaParamsComponent
  ]
})
export class JmaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initial = input<JmaInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Jma[] = [];

        for (let i = 0; i < init.length.length; i++) {
          for (let j = 0; j < init.phase.length; j++) {
            const jma = createJma(sid + i, init.showStyle,
              init.length[i], init.phase[j], init.barComponent);
            jma.style.color = this.colorArray[i%this.colorArray.length];
            arr.push(jma);
          }
        }
    
        this.jmaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Jma[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.jmaArray.length; i++) {
          const jma = {...this.jmaArray[i]};
          jma.style.color = inp[i%inp.length];
          jma.id = sid + i;
          arr.push(jma);
        }
  
        this.jmaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Jma[]>();

  protected jmaArray: Jma[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.jmaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const jma = createJma(
      this.startId + this.jmaArray.length,
      showStyle,
      this.getLastLength() + 5,
      0,
      this.defaultBarComponent);

    if (showStyle) {
      jma.style.color = this.colorArray[this.jmaArray.length%this.colorArray.length];
    }

    this.jmaArray.push(jma);
    this.jmaArray = [...this.jmaArray];
    this.notify();
  }

  protected updated(jma: Jma): void {
    const i = this.getIndex(jma);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(jma: Jma): void {
    const i = this.getIndex(jma);
    if (i >= 0) {
      this.jmaArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.jmaArray.length; ++j) {
        this.jmaArray[j].id = sid + j;
      }
      this.jmaArray = [...this.jmaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.jmaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    return this.jmaArray[last].params.length;
  }

  private getShowStyle(): boolean {
    if (this.jmaArray.length <= 0) {
      return false;
    }

    return this.jmaArray[0].showStyle;
  }

  private getIndex(jma: Jma): number {
    for (let i = 0; i < this.jmaArray.length; i++) {
      const el = this.jmaArray[i];
      if (el === jma) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.jmaArray);
    }
  }
}
