import { Component, ElementRef, ViewEncapsulation, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, HostListener, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

@Component({
    selector: 'app-d3-sample-click-to-recenter-brush-2',
    templateUrl: './click-to-recenter-brush-2.component.html',
    styleUrls: ['./click-to-recenter-brush-2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None // Otherwise active circles will not be highlighted.
})
export class ClickToRecenterBrush2Component {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef);
  private readonly container = viewChild.required<ElementRef>('container4');
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

    const randomX = d3.randomUniform(0, 10);
    const randomY = d3.randomNormal(0.5, 0.12);
    const data = d3.range(800).map(() => [randomX(), randomY()]);

    const margin: any = { top: 20, right: 10, bottom: 40, left: 20 };
    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const svg: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight());
    const width: number = +w - margin.left - margin.right;
    const height: number = +this.svgheight() - margin.top - margin.bottom;

    const g: any = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x: d3.ScaleLinear<number, number> = d3.scaleLinear().domain([0, 10]).range([0, width]);
    const y: d3.ScaleLinear<number, number> = d3.scaleLinear().range([height, 0]);

    const brush = d3.brushX().extent([[0, 0], [width, height]]);

    const dot = g.append('g')
      .attr('fill-opacity', 0.2)
      .selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('transform', (d: any) => 'translate(' + x(d[0]) + ',' + y(d[1]) + ')')
      .attr('r', 3.5);

    brush.on('start brush', (event: any) => {
      const s = event.selection;
      if (!s) {
        return; // Ignore empty selections.
      }
      const sx = s.map(x.invert);
      dot.classed('active', (d: any) => sx[0] <= d[0] && d[0] <= sx[1]);
    });

    brush.on('end', function(event: any) {
      if (!event.sourceEvent) {
        return; // Only transition after input.
      }
      const s = event.selection;
      if (!s) {
        return; // Ignore empty selections.
      }
      const d0 = s.map(x.invert);
      const d1 = d0.map(Math.round);

      // If empty when rounded, use floor & offset instead.
      if (d1[0] >= d1[1]) {
        d1[0] = Math.floor(d0[0]);
        d1[1] = d1[0] + 1;
      }
      d3.select(this).transition().call(brush.move, d1.map(x));
    });

    g.append('g')
      .call(brush)
      .call(brush.move, [3, 5].map(x))
      .selectAll('.overlay')
      .each((d: any) => { d.type = 'selection'; }) // Treat overlay interaction as move.
      .on('mousedown touchstart', function(event: any) { // Recenter before brushing.
        const dx = x(1) as number - x(0) as number; // Use a fixed width when recentering.
        const cx = d3.pointers(event)[0][0];
        const x0 = cx - dx / 2;
        const x1 = cx + dx / 2;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const s = d3.select(this.parentNode);
        s.call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
      });

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
  }
}
