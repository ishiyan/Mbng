import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

import { computeDimensions } from '../../charts/compute-dimensions';

const DEFAULT_WIDTH = 64;
const DEFAULT_HEIGHT = 24;

@Component({
    selector: 'mb-swatches',
    templateUrl: './swatches.component.html',
    styleUrls: ['./swatches.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SwatchesComponent implements OnChanges, AfterViewInit {
  private elementRef = inject(ElementRef);
  
  /** A width of the swatches. */
  readonly width = input<number | string>(DEFAULT_WIDTH);

  /** A height of the swatches. */
  readonly height = input<number | string>(DEFAULT_HEIGHT);

  /** Specifies an array of colors. */
  readonly colors = input.required<string[]>(); 

  private currentColors = computed(() => {
    const updatedColors = this.colors();
    if (updatedColors?.length) {
      return updatedColors;
    }
    return [];
  });

  ngAfterViewInit() {
    setTimeout(() => this.render(), 0);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(_changes: any) {
    this.render();
  }

  @HostListener('window:resize', [])
  public render(): void {
    const sel = d3.select(this.elementRef.nativeElement);
    sel.select('svg').remove();

    const clrs = this.currentColors();
    const clrsLen = clrs.length;
    if (clrsLen < 1) {
      return;
    }

    const computed = computeDimensions(this.elementRef, this.width(), this.height(), DEFAULT_WIDTH, DEFAULT_HEIGHT);
    const w = computed[0];
    const h = computed[1];
    const swatchWidth = w / clrsLen;

    const svg: any = sel.append('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);

    for (let i = 0; i < clrsLen; ++i) {
      svg.append('rect').attr('x', swatchWidth * i).attr('y', '0').attr('width', swatchWidth).attr('height', h).attr('fill', clrs[i]);
    }
  }
}
