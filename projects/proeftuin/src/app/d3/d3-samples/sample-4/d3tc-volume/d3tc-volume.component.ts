import { Component, ElementRef, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, HostListener, afterNextRender } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MatButton } from '@angular/material/button';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-sample-d3tc-volume',
  templateUrl: './d3tc-volume.component.html',
  styleUrls: ['./d3tc-volume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton]
})
export class D3tcVolumeComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef);
  readonly container = viewChild.required<ElementRef>('container');
  readonly svgheight = input<any>();

  constructor() {
    afterNextRender({
      write: () => {
        this.render();
      }
    });
  }

  @HostListener('window:resize', [])
  render() {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const data: Bar[] = dataOhlcvDaily;

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const svg: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight())
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight() - margin.top - margin.bottom;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = primitives.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    // We need ohlc accessor for volume bar highlighting.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ohlc = primitives.plot.ohlc().xScale(x).yScale(y);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const volume = primitives.plot.volume().accessor(ohlc.accessor()).xScale(x).yScale(y);
    const accessor = volume.accessor();
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).tickFormat(d3.format(',.3s'));

    function draw(dat: Bar[]) {
      x.domain(dat.map(accessor.time));
      y.domain(primitives.scale.plot.volume(dat, accessor.v).domain());
      svg.selectAll('g.volume').datum(dat).call(volume);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }

    // data begin ----------------------------------
    svg.append('g').attr('class', 'volume');
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em')
      .style('text-anchor', 'end').text('Volume');
    let toggle = true;
    const d: Bar[] = data.slice(0, data.length - 20);
    draw(d);
    d3.select(this.element.nativeElement).select('button').on('click', () => { draw(toggle ? data : d); toggle = !toggle; });
    // data end ----------------------------------
  }
}
