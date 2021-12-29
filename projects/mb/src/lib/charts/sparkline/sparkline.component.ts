import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

import { Ohlcv } from '../../data/entities/ohlcv';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SparklineComponent implements OnChanges, AfterViewInit {
  /** A width of the sparkline. */
  @Input() width: number | string = defaultWidth;

  /** A height of the sparkline. */
  @Input() height: number | string = defaultHeight;

  private currentConfiguration: SparklineConfiguration = {
    fillColor: 'steelblue', strokeColor: undefined, strokeWidth: 1, interpolation: 'linear'
  };
  private currentData!: Ohlcv[] | Quote[] | Trade[] | Scalar[];

  /** Specifies fill, stroke and interpolation. */
  @Input() set configuration(cfg: SparklineConfiguration) {
    if (cfg && cfg != null) {
      this.currentConfiguration = { ...this.currentConfiguration, ...cfg };
    }
  }
  get configuration(): SparklineConfiguration {
    return this.currentConfiguration;
  }

  /** The data array to use. */
  @Input() set data(dat: Ohlcv[] | Quote[] | Trade[] | Scalar[]) {
    this.currentData = dat;
  }
  get data(): Ohlcv[] | Quote[] | Trade[] | Scalar[] {
    return this.currentData;
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => this.render(), 0);
  }

  ngOnChanges(changes: any) {
    this.render();
  }

  @HostListener('window:resize', [])
  public render(): void {
    const sel = d3.select(this.elementRef.nativeElement);
    sel.select('svg').remove();
    const dat = this.currentData;
    if (!dat || dat.length < 1) {
      return;
    }
    const cfg = this.currentConfiguration;
    const computed = computeDimensions(this.elementRef, this.width, this.height, defaultWidth, defaultHeight);
    const w = computed[0];
    const h = computed[1];

    const svg: any = sel.append('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);

    // const xScale = d3.scaleLinear().domain([0, dat.length - 1]).range([0, w]);
    const xScale = d3.scaleTime().range([0, w]).domain([dat[0].time, dat[dat.length - 1].time]);

    let yExtent: any[];
    let getY: any;
    if ((dat as Ohlcv[])[0].close !== undefined) {
      yExtent = d3.extent(dat as Ohlcv[], d => d.close);
      getY = (d: any) => (d as Ohlcv).close;
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
        .x((d: any, i: number) => xScale(d.time) as number)
        .y0((d: any) => yScale(min) as number)
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
        .x((d: any, i: number) => xScale(d.time) as number)
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
