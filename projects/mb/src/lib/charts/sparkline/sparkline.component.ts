import { Component, HostListener, ElementRef, ChangeDetectionStrategy, PLATFORM_ID, input, inject, effect, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { Bar } from '../../data/entities/bar';
import { Quote } from '../../data/entities/quote';
import { Trade } from '../../data/entities/trade';
import { Scalar } from '../../data/entities/scalar';
import { SparklineConfiguration } from './sparkline-configuration.interface';
import { computeDimensions } from '../compute-dimensions';
import { convertInterpolation } from '../convert-interpolation';

const defaultWidth = 160;
const defaultHeight = 24;

@Component({
  selector: 'mb-sparkline',
  templateUrl: './sparkline.component.html',
  styleUrls: ['./sparkline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SparklineComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /** A width of the sparkline. */
  readonly width = input<number | string>(defaultWidth);

  /** A height of the sparkline. */
  readonly height = input<number | string>(defaultHeight);

  private currentConfiguration: SparklineConfiguration = {
    fillColor: 'steelblue', strokeColor: undefined, strokeWidth: 1, interpolation: 'linear'
  };
  private currentData?: Bar[] | Quote[] | Trade[] | Scalar[];

  /** Specifies fill, stroke and interpolation. */
  configuration = input.required<SparklineConfiguration>();

  /** The data array to use. */
  data = input.required<Bar[] | Quote[] | Trade[] | Scalar[]>();

  constructor() {
    effect(() => {      
      const cfg = this.configuration();
      this.currentConfiguration = { ...this.currentConfiguration, ...cfg };
      this.render();
    });
    effect(() => {
      this.currentData = this.data();
      this.render();
    });
    afterNextRender({
      write: () => {
        this.render();
      }
    });
  }

  @HostListener('window:resize', [])
  public render(): void {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const dat = this.currentData;
    if (!dat || dat === null || dat.length < 1) {
      return;
    }

    const sel = d3.select(this.elementRef.nativeElement);
    if (!sel || sel === null) {
      return;
    }

    sel.select('svg').remove();
    const cfg = this.currentConfiguration;
    const computed = computeDimensions(this.elementRef, this.width(), this.height(), defaultWidth, defaultHeight);
    const w = computed[0];
    const h = computed[1];

    const svg: any = sel.append('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);

    // const xScale = d3.scaleLinear().domain([0, dat.length - 1]).range([0, w]);
    const xScale = d3.scaleTime().range([0, w]).domain([dat[0].time, dat[dat.length - 1].time]);

    let yExtent: any[];
    let getY: any;
    if ((dat as Bar[])[0].close !== undefined) {
      yExtent = d3.extent(dat as Bar[], d => d.close);
      getY = (d: any) => (d as Bar).close;
    } else if ((dat as Trade[])[0].price !== undefined) {
      yExtent = d3.extent(dat as Trade[], d => d.price);
      getY = (d: any) => (d as Trade).price;
    } else if ((dat as Quote[])[0].bidPrice !== undefined) {
      yExtent = d3.extent(dat as Quote[], d => d.bidPrice);
      getY = (d: any) => (d as Quote).bidPrice;
    } else {
      yExtent = d3.extent(dat as Scalar[], d => d.value);
      getY = (d: any) => (d as Scalar).value;
    }

    const interp = cfg.interpolation ? cfg.interpolation : 'linear;';
    const yScale = d3.scaleLinear().domain(yExtent).range([h, 0]);
    svg.datum(dat);
    if (cfg.fillColor && cfg.fillColor !== 'none') {
      const min: number = yExtent[0];
      const area: any = d3.area()
        .curve(convertInterpolation(interp))
        .defined((d: any) => !isNaN(getY(d)))
        // .x((d: any, i: number) => xScale(i))
        .x((d: any) => xScale(d.time) as number)
        .y0(() => yScale(min) as number)
        .y1((d: any) => yScale(getY(d)) as number);
      svg.append('path')
        .attr('fill', cfg.fillColor)
        .attr('d', area);
    }
    if (cfg.strokeColor && cfg.strokeWidth && cfg.strokeWidth > 0 && cfg.strokeColor !== 'none') {
      const line: any = d3.line()
        .curve(convertInterpolation(interp))
        .defined((d: any) => !isNaN(getY(d)))
        // .x((d: any, i: number) => xScale(i))
        .x((d: any) => xScale(d.time) as number)
        .y((d: any) => yScale(getY(d)) as number);
      svg.append('path')
        .attr('stroke-width', cfg.strokeWidth)
        .attr('stroke', cfg.strokeColor)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .style('fill', 'none')
        .attr('d', line);
    }
  }
}
