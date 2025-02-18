import { Component, ElementRef, ChangeDetectionStrategy, PLATFORM_ID, HostListener, input, inject, computed, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { computeDimensions } from '../compute-dimensions';
import { ColorInterpolation } from './color-interpolation';
import { d2xy } from './hilbert';

const defaultSize = 300;
const defaultOrder = 5;
const defaultStrokeWidth = 1;

@Component({
    selector: 'mb-hilbert-curve',
    templateUrl: './hilbert-curve.component.html',
    styleUrls: ['./hilbert-curve.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HilbertCurveComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef);
  
  /** A number of hierarchy levels to display or **0** to display all levels. */
  readonly order = input<number>(defaultOrder);
  
  /** A size of the bounding square of the curve. */
  readonly size = input<number | string>(defaultSize);

  /** A function returning a fill color of a curve path segment. */
  readonly strokeWidth = input<number>(defaultStrokeWidth);

  /** A function returning a fill color of a curve path segment. */
  readonly strokeColorFunc = input<ColorInterpolation>();

  /** A function returning a fill color of a curve path segment rectangle. */
  readonly fillColorFunc = input<ColorInterpolation>();

  private readonly twoPowerOrder = computed(() => Math.pow(2, this.order()));

  constructor() {
    effect(() => {
      this.order();
      this.size();
      this.strokeWidth();
      this.strokeColorFunc();
      this.fillColorFunc();

      this.render();
    });
  }

  @HostListener('window:resize', [])
  public render(): void {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const sel = d3.select(this.elementRef.nativeElement);
    sel.select('svg').remove();

    const computed = computeDimensions(this.elementRef, this.size(), defaultSize, defaultSize, defaultSize);
    const s = computed[0];

    const svg: any = sel.append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', s)
      .attr('height', s)
      .attr('viewBox', `0 0 ${s} ${s}`);
    const g = svg.append('g');

    const order = this.order();
    const twoPowerOrder = this.twoPowerOrder();
    const delta = s / twoPowerOrder;
    const shift = delta / 2;
    const twoPowerTwiceOrder = twoPowerOrder * twoPowerOrder;
    const x = d3.scaleLinear()
      .domain([0, twoPowerOrder])
      .range([0, s]);
    const line = d3.line()
      .x(d => x(d[0]) as number + shift)
      .y(d => x(d[1]) as number + shift);
    const curve = d3.range(twoPowerTwiceOrder)
      .map(i => d2xy(order, i));

    const fillColorFunc = this.fillColorFunc(); 
    if (fillColorFunc) {
      const squares = g.selectAll('rect')
        .data(curve);
      squares.exit()
        .remove();
      squares.enter()
        .append('rect')
        .style('fill', (d: any, i: number) => fillColorFunc(i / twoPowerTwiceOrder))
        //.attr('x', (d: any) => x(d[0] - .5))
        //.attr('y', (d: any) => x(d[1] - .5))
        .attr('x', (d: any) => x(d[0]))
        .attr('y', (d: any) => x(d[1]))
        .attr('width', delta)
        .attr('height', delta);
    }

    const strokeWidth = this.strokeWidth();
    const strokeColorFunc = this.strokeColorFunc();
    const segments = g.selectAll('path')
      .data(d3.range(twoPowerTwiceOrder - 1))
    segments.exit()
      .remove();
    if (strokeColorFunc) {
      segments.enter()
        .append('path')
        .merge(segments)
        .attr('d', (i: number) => line([curve[i], curve[i + 1]]))
        .attr('stroke', (i: number) => strokeColorFunc(i / twoPowerTwiceOrder))
        .attr('stroke-width', strokeWidth);
    }
    else
    {
      segments.enter()
        .append('path')
        .attr('class', 'seg')
        .merge(segments)
        .attr('d', (i: number) => line([curve[i], curve[i + 1]]))
        .attr('stroke-width', strokeWidth);
    }
  }
}
