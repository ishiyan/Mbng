import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

import { computeDimensions } from '../../charts/compute-dimensions';

const DEFAULT_WIDTH = 64;
const DEFAULT_HEIGHT = 24;

@Component({
  selector: 'mb-swatches',
  templateUrl: './swatches.component.html',
  styleUrls: ['./swatches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SwatchesComponent implements OnChanges, AfterViewInit {
  private currentColors: string[] = [];

  /** A width of the swatches. */
  @Input() width: number | string = DEFAULT_WIDTH;

  /** A height of the swatches. */
  @Input() height: number | string = DEFAULT_HEIGHT;

  /** Specifies an array of colors. */
  @Input() set colors(clrs: string[]) {
    if (clrs && clrs != null && clrs.length > 0) {
      // Assume colors are specified correctly.
      this.currentColors = clrs;
    }
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

    const clrs = this.currentColors;
    const clrsLen = clrs.length;
    if (clrsLen < 1) {
      return;
    }

    const computed = computeDimensions(this.elementRef, this.width, this.height, DEFAULT_WIDTH, DEFAULT_HEIGHT);
    const w = computed[0];
    const h = computed[1];
    const swatchWidth = w / clrsLen;

    const svg: any = sel.append('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);

    for (let i = 0; i < clrsLen; ++i) {
      svg.append('rect').attr('x', swatchWidth * i).attr('y', '0').attr('width', swatchWidth).attr('height', h).attr('fill', clrs[i]);
    }
  }
}
