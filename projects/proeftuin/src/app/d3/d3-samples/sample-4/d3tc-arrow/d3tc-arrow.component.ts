import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

@Component({
  selector: 'd3-sample-d3tc-arrow',
  templateUrl: './d3tc-arrow.component.html',
  styleUrls: ['./d3tc-arrow.component.scss'],
  encapsulation: ViewEncapsulation.None // does not see css without this
})
export class D3tcArrowComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const w = this.container.nativeElement.getBoundingClientRect().width;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('width', w)
      .attr('height', this.svgheight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const data = ['up', 'right', 'down', 'left'];

    const arrow = d3tc.svg.arrow().x(230).y(0).height(50).width(50);

    const arrowOrient = d3tc.svg.arrow().orient((d: any) => d)
      .x((d: any, i: any) => 0 + i * 50)
      .y((d: any, i: any) => 0 + i * 50);

    const arrowTranslate = d3tc.svg.arrow().tail(false);

    svg.append('path').attr('class', 'arrow').attr('d', arrow);

    svg.selectAll('path.arrow.orient').data(data).enter()
      .append('path')
      .attr('class', (d: any) => 'arrow orient ' + d)
      .attr('d', arrowOrient);

    svg.selectAll('path.arrow.rotate').data(data).enter()
      .append('path')
      .attr('class', (d: any) => 'arrow rotate ' + d)
      .attr('transform', (d: any, i: any) =>
        'translate(' + (100 + i * 50) + ', ' + (0 + i * 50) + ') rotate(' + i * 45 + ')')
      .attr('d', arrowTranslate);
  }
}
