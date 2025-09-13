import { Component, ElementRef, ViewEncapsulation, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';

@Component({
  selector: 'app-d3-techan-d3tc-arrow',
  templateUrl: './d3tc-arrow.component.html',
  styleUrls: ['./d3tc-arrow.component.scss'],
  encapsulation: ViewEncapsulation.None, // does not see css without this
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3tcArrowComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef);
  private resizeObserver?: ResizeObserver;

  readonly container = viewChild.required<ElementRef>('container');
  readonly svgheight = input<any>();

  constructor() {
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

    this.resizeObserver.observe(this.element.nativeElement);
  }

  private render() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const svg: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight())
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const data = ['up', 'right', 'down', 'left'];

    const arrow = primitives.shapes.arrow().x(230).y(0).height(50).width(50);

    const arrowOrient = primitives.shapes.arrow().orient((d: any) => d)
      .x((d: any, i: any) => 0 + i * 50)
      .y((d: any, i: any) => 0 + i * 50);

    const arrowTranslate = primitives.shapes.arrow().tail(false);

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
