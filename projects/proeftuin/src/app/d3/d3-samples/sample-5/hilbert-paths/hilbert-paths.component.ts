import { Component, OnInit, ElementRef, inject } from '@angular/core';
import * as d3 from 'd3';

function distance2xy(d: number): { x: number; y: number } {
  let s = 1;
  let iter = 0;
  let curPos = { x: 0, y: 0 };

  // d = Math.floor(d);
  while (d > 0) {
    const ry = 1 & (d >> 1);
    const rx = 1 & (ry ^ d);

    // Rotate if needed
    if (rx === 0) {
      if (ry === 1) {
        curPos = { x: s - 1 - curPos.x, y: s - 1 - curPos.y };
      }
      curPos = { x: curPos.y, y: curPos.x };
    }

    curPos = { x: curPos.x + s * rx, y: curPos.y + s * ry };

    s <<= 1; // s *= 2;
    d >>= 2; // d = Math.floor(d / 4);
    iter = (iter + 1) % 2;
  }

  if (iter == 0) {
    curPos = { x: curPos.y, y: curPos.x };
  }

  return curPos;
}

@Component({
    selector: 'app-d3-sample-hilbert-paths',
    templateUrl: './hilbert-paths.component.html',
    styleUrls: ['./hilbert-paths.component.scss']
})
export class HilbertPathsComponent implements OnInit {
  private element = inject(ElementRef);

  private svg: any;

  ngOnInit() {
    if (this.svg) {
      return;
    }
    this.svg = d3.select(this.element.nativeElement).select('svg').attr('width', 960).attr('height', 530)
      .append('g').attr('transform', 'translate(10,10)');
    const scale = 8;
    const max = Math.pow(2, Math.floor(Math.log2(512 / scale)));
    const max2 = max * max;

    // const color: any = d3.scaleOrdinal(d3.schemeCategory20b);
    function colors(s: any) { return s.match(/.{6}/g).map((x: any) => '#' + x); }
    const category20b = colors(
      '393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6');
    const color = d3.scaleOrdinal(category20b);

    let n = 0;
    let m = 0;
    const segments = [];
    while (n < max2) {
      m = 3 + Math.floor(100 * Math.random() * Math.random());
      segments.push([n, n += m]);
    }
    segments[segments.length - 1][1] = max2;
    this.svg.append('g').selectAll('path').data(segments).enter().append('path')
      .attr('fill', 'transparent')
      //.attr('stroke', (d: any, i: any) => color(i))
      .attr('stroke', (d: any, i: any) => d3.interpolateSinebow(i / segments.length))
      .attr('stroke-width', '8')
      .attr('stroke-linecap', 'square')
      .attr('d', (d: any) => 'M' + d3.range(d[0], d[1])
        .map(e => {
          const xy = distance2xy(e);
          return [scale * xy.x, scale * xy.y];
        }).join('L'));
    const xs = 'x';
    const ys = 'y';
    this.svg.append('path').attr('fill', 'transparent').attr('stroke', '#fff').attr('stroke-width', '1')
      .attr('d', 'M' + d3.range(max * max).map(distance2xy).map((d: any) => [scale * d[xs], scale * d[ys]]).join('L'));
    const t = this.svg.append('text').attr('y', 10).attr('x', 512).attr('font-size', 12).style('font-family', 'monospace');

    const numberOfBalls = 7; // [2, 7]
    const c = d3.range(numberOfBalls).map(i => this.svg.append('circle').attr('r', 3).attr('fill', 'white'));
    const speed = 100; // [10, 500]
    d3.interval(e => {
      const xy = distance2xy((e / speed) % max2);
      c[Math.floor(Math.random() * c.length)].transition().duration(speed).attr('cx', scale * xy.x).attr('cy', scale * xy.y);
      t.text(JSON.stringify(xy));
    }, speed);
  }
}
