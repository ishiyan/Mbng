import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'd3-sample-click-to-select-all',
  templateUrl: './click-to-select-all.component.html',
  styleUrls: ['./click-to-select-all.component.scss']
})
export class ClickToSelectAllComponent implements OnInit {
  @ViewChild('container5', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const randomX = d3.randomUniform(0, 10);
    const randomY = d3.randomNormal(0.5, 0.12);
    const data = d3.range(800).map(() => [randomX(), randomY()]);

    const margin: any = { top: 20, right: 10, bottom: 40, left: 20 };
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('width', w)
      .attr('height', this.svgheight);
    const width: number = +w - margin.left - margin.right;
    const height: number = +this.svgheight - margin.top - margin.bottom;

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

    brush.on('start brush end', (event: any) => {
      const s = event.selection;
      if (s == null) {
        dot.classed('activa', false);
      } else {
        const sx = s.map(x.invert);
        dot.classed('active', (d: any) => sx[0] <= d[0] && d[0] <= sx[1]);
      }
    });

    g.append('g')
      .call(brush)
      .call(brush.move, [3, 5].map(x))
      .selectAll('.overlay')
      .on('mousedown touchstart', function(event: any) { // Recenter before brushing.
        event.stopImmediatePropagation();
        // eslint-disable-next-line @typescript-eslint/no-shadow
        // @ts-ignore
        d3.select(this.parentNode).transition().call(brush.move, x.range());
      }, true);

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
  }
}
