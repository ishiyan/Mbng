import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';

// https://observablehq.com/@d3/click-to-recenter-brush

@Component({
  selector: 'd3-sample-click-to-recenter-brush',
  templateUrl: './click-to-recenter-brush.component.html',
  styleUrls: ['./click-to-recenter-brush.component.scss']
})
export class ClickToRecenterBrushComponent implements OnInit {
  @ViewChild('container3', { static: true }) container!: ElementRef;
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
      .each((d: any) => { d.type = 'selection'; }) // Treat overlay interaction as move.
      .on('mousedown touchstart', function(event: any) { // Recenter before brushing.
        const dx = x(1) as number - x(0) as number; // Use a fixed width when recentering.
        const cx = d3.pointers(event)[0][0];
        const x0 = cx - dx / 2;
        const x1 = cx + dx / 2;
        // @ts-ignore
        const s = d3.select(this.parentNode);
        s.call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
      });

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
  }
}
