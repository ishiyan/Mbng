import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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

const createTrima = (showStyle: boolean, len: number, comp?: BarComponent): Trima => {
  const params = {length: len, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

@Component({
    selector: 'app-trima-list',
    templateUrl: './trima-list.component.html',
    styleUrls: ['./trima-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgFor,
      MatMiniFabButton,
      MatIcon,
      TrimaParamsComponent,
    ]
})
export class TrimaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  @Input() set initial(init: TrimaInput) {
    const arr: Trima[] = [];

    for (let i = 0; i < init.length.length; i++) {
      const trima = createTrima(init.showStyle, init.length[i], init.barComponent);
      trima.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(trima);
    }

    this.trimaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the input colors. */
  @Input() set colors(inp: string[]) {
    if (inp && inp.length > 0) {
      const arr: Trima[] = [];
      this.colorArray = inp;

      for (let i = 0; i < this.trimaArray.length; i++) {
        const trima = {...this.trimaArray[i]};
        trima.style.color = inp[i%inp.length];

        arr.push(trima);
      }

      this.trimaArray = arr;
    }
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly changed: EventEmitter<Trima[]> = new EventEmitter<Trima[]>();

  protected trimaArray: Trima[] = [];
  protected colorArray = ['#ff0000'];

  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.trimaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const trima = createTrima(showStyle, this.getLastLength() + 5, this.defaultBarComponent);

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
