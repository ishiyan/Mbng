import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

// https://observablehq.com/@d3/brush-handles

@Component({
  selector: 'd3-sample-brush-handles',
  templateUrl: './brush-handles.component.html',
  styleUrls: ['./brush-handles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrushHandlesComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    const data: Array<number> = d3.range(800).map(Math.random);
    const margin: any = { top: 20, right: 10, bottom: 40, left: 20 };
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('width', w)
      .attr('height', this.svgheight);
    const width: number = +w - margin.left - margin.right;
    const height: number = +this.svgheight - margin.top - margin.bottom;
    const g: any = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const x: d3.ScaleLinear<number, number> = d3.scaleLinear().range([0, width]);
    const y: any = d3.randomNormal(height / 2, height / 8);
    const brush = d3.brushX().extent([[0, 0], [width, height]]);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    const circle: any = g.append('g')
      .attr('class', 'circle')
      .selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('transform', (d: any) => 'translate(' + x(d) + ',' + y() + ')')
      .attr('r', 3.5);

    const gBrush: any = g.append('g').attr('class', 'brush').call(brush);

    const handle: any = gBrush.selectAll('.handle--custom')
      .data([{ type: 'w' }, { type: 'e' }])
      .enter().append('path')
      .attr('class', 'handle--custom')
      .attr('fill', '#666')
      .attr('fill-opacity', 0.8)
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .attr('cursor', 'ew-resize')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(height / 2)
        .startAngle(0)
        .endAngle((d, i) => i ? Math.PI : -Math.PI));

    brush.on('start brush end', (event: any) => {
      const s = event.selection;
      if (s == null) {
        handle.attr('display', 'none');
        circle.classed('active', false);
      } else {
        const sx = s.map(x.invert);
        circle.classed('active', (d: any) => sx[0] <= d && d <= sx[1]);
        handle
          .attr('display', null)
          .attr('transform', (d: any, i: any) => 'translate(' + s[i] + ',' + height / 2 + ')');
      }
    });
    gBrush.call(brush.move, [0.3, 0.5].map(x));
  }
}
