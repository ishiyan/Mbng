import { Component, ElementRef, ChangeDetectionStrategy, PLATFORM_ID, input, inject, effect, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { Bar } from '../../data/entities/bar';
import { Quote } from '../../data/entities/quote';
import { Trade } from '../../data/entities/trade';
import { Scalar } from '../../data/entities/scalar';
import { convertInterpolation } from '../convert-interpolation';

const defaultWidth = 160;
const defaultHeight = 24;

@Component({
  selector: 'mb-sparkline',
  templateUrl: './sparkline.component.html',
  styleUrls: ['./sparkline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SparklineComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private currentData?: Bar[] | Quote[] | Trade[] | Scalar[];
  private resizeObserver?: ResizeObserver;

  /** The data array to use. */
  data = input.required<Bar[] | Quote[] | Trade[] | Scalar[]>();

  constructor() {
    effect(() => {
      this.currentData = this.data();
      this.render();
    });

    afterNextRender({
      write: () => {
        this.setupResizeObserver();
        this.render();
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private setupResizeObserver(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.render();
    });
    
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  private render(): void {
    if (!isPlatformBrowser(this.platformId)) {
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
    const computedStyle = getComputedStyle(this.elementRef.nativeElement);

    // Get colors and gradient settings
    const hasGradientStart = computedStyle.getPropertyValue('--sparkline-gradient-start-internal').trim();
    const hasGradientEnd = computedStyle.getPropertyValue('--sparkline-gradient-end-internal').trim();
    const gradientDirection = computedStyle.getPropertyValue('--sparkline-gradient-direction-internal').trim();
    const hasGradient = hasGradientStart && hasGradientEnd;
    const interpolation = computedStyle.getPropertyValue('--sparkline-interpolation-internal').trim();

    // Use element's computed width/height directly
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const w = rect.width || defaultWidth;
    const h = rect.height || defaultHeight;

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

    const yScale = d3.scaleLinear().domain(yExtent).range([h, 0]);
    svg.datum(dat);

    // Create gradient if needed
    let fillId = '';
    let strokeId = '';
    let fillClass = 'sparkline-fill';
    let strokeClass = 'sparkline-stroke';

    if (hasGradient) {
      const defs = svg.append('defs');
      const uid = `sparkline-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      
      fillId = `${uid}-fill-gradient`;
      fillClass = 'sparkline-fill-gradient';
      const fillGradient = defs.append('linearGradient')
        .attr('id', fillId)
        .attr('gradientUnits', 'userSpaceOnUse');

      strokeId = `${uid}-stroke-gradient`;
      strokeClass = 'sparkline-stroke-gradient';
      const strokeGradient = defs.append('linearGradient')
        .attr('id', strokeId)
        .attr('gradientUnits', 'userSpaceOnUse');

      if (gradientDirection === 'horizontal') {
        fillGradient
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', w)
          .attr('y2', 0);
        strokeGradient
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', w)
          .attr('y2', 0);
      } else {
        fillGradient
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', 0)
          .attr('y2', h);
        strokeGradient
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', 0)
          .attr('y2', h);
      }
      
      fillGradient.append('stop')
        .attr('offset', '0%')
        .attr('class', 'sparkline-gradient-start');
      fillGradient.append('stop')
        .attr('offset', '100%')
        .attr('class', 'sparkline-gradient-end');

      strokeGradient.append('stop')
        .attr('offset', '0%')
        .attr('class', 'sparkline-gradient-start');
      strokeGradient.append('stop')
        .attr('offset', '100%')
        .attr('class', 'sparkline-gradient-end');
    }

    // Always render area and line - let CSS determine styling
    const min: number = yExtent[0];
    const area: any = d3.area()
      .curve(convertInterpolation(interpolation))
      .defined((d: any) => !isNaN(getY(d)))
      .x((d: any) => xScale(d.time) as number)
      .y0(() => yScale(min) as number)
      .y1((d: any) => yScale(getY(d)) as number);
    const areaPath = svg.append('path')
      .attr('d', area)
      .attr('class', fillClass);
    if (hasGradient) {
        areaPath.attr('fill', `url(#${fillId})`);
    }

    const line: any = d3.line()
      .curve(convertInterpolation(interpolation))
      .defined((d: any) => !isNaN(getY(d)))
      .x((d: any) => xScale(d.time) as number)
      .y((d: any) => yScale(getY(d)) as number);
    const linePath = svg.append('path')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .style('fill', 'none')
      .attr('d', line)
      .attr('class', strokeClass);
    if (hasGradient) {
      linePath.attr('stroke', `url(#${strokeId})`);
    }
  }
}
