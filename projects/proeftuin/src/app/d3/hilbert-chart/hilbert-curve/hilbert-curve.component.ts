import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';
import * as d3 from 'd3';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as hilbert from '../hilbert';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'app-d3-hilbert-curve',
    templateUrl: './hilbert-curve.component.html',
    styleUrls: ['./hilbert-curve.component.scss'],
    imports: [MatFormField, MatSelect, MatOption, MatSlideToggle]
})
export class HilbertCurveComponent implements OnInit {
  private element = inject(ElementRef);

  public colors = false;
  public selectedLevel = '6';
  private level = 6;
  private level10 = Math.pow(2, this.level); // 1 << this.level
  private level102 = Math.pow(2, this.level * 2); // 1 << (this.level * 2)
  private readonly w = 500;
  private readonly x = d3.scaleLinear().domain([0, this.level10]).range([0, this.w]);
  private line: any;
  private g: any;

  ngOnInit() {
    // why can't it find the svg element? have to use svg id instead
    this.g = d3.select(this.element.nativeElement).select('#d3-hilbert-curve').attr('width', this.w).attr('height', this.w)
      .append('g');
    //this.g.append('path').attr('d', 'M0,0').style('fill', 'none').style('stroke', 'black');
    this.line = d3.line().x(d => this.x(d[0]) as number).y(d => this.x(d[1]) as number);
    this.redraw();
  }

  selectionChanged(event: MatSelectChange) {
    this.level = +event.value;
    this.level10 = Math.pow(2, this.level); // 1 << this.level
    this.level102 = Math.pow(2, this.level * 2); // 1 << (this.level * 2)
    this.redraw();
  }

  colorChanged(event: MatSlideToggleChange /*MatCheckboxChange*/) {
    this.colors = event.checked;
    this.redraw();
  }

  private redraw() {
    this.x.domain([-.5, this.level10]);
    const size = this.x(1) as number - this.x(0) as number + 1;
    // console.log('level', this.level, 'size:', size);

    // Clean up everything, so the path segments will always be on top of rectangles.
    this.g.selectAll('path').remove();
    this.g.selectAll('rect').remove();
    
    const curve = d3.range(this.level102).map(i => hilbert.d2xy(this.level, i));
    const squares = this.g.selectAll('rect').data(this.colors ? curve : []);
    squares.exit().remove();
    squares.enter()
      .append('rect')
    //this.g.selectAll('rect')
      //.style('fill', (d: any, i: any) => d3.hsl(Math.floor(i * 360 / this.level102), 1, .5).rgb())
      //.style('fill', (d: any, i: any) => d3.hsl(~~(i * 360 / this.level102), 1, .5).rgb())
      //.style('fill', (d: any, i: any) => d3.hcl(Math.floor(i * 360 / this.level102), 100, 100, 1).rgb())
      //.style('fill', (d: any, i: any) => d3.hcl(~~(i * 360 / this.level102), 230, 100, 1).rgb())
      //.style('fill', (d: any, i: any) => d3.lch(100, 230, Math.floor(i * 360 / this.level102), 1).rgb())
      //.style('fill', (d: any, i: any) => d3.cubehelix(Math.floor(i * 360 / this.level102), 5, .8).rgb())
      //.style('fill', (d: any, i: any) => d3.interpolateWarm(i/this.level102))
      //.style('fill', (d: any, i: any) => d3.interpolateCool(i/this.level102))
      //.style('fill', (d: any, i: any) => d3.interpolateRainbow(i/this.level102))
      .style('fill', (d: any, i: any) => d3.interpolateSinebow(i/this.level102))
      .attr('x', (d: any) => this.x(d[0] - .5)).attr('y', (d: any) => this.x(d[1] - .5))
      .attr('width', size).attr('height', size);

    /*this.g.select('path').remove();
    //this.g.append('path').attr('d', this.line(curve)).style('fill', 'none').style('stroke', 'black');
    this.g.append('path')
      .attr('d', this.line(curve))
      .attr('stroke-width', '2')
      .attr('stroke', (d: any, i: any) => d3.interpolateSinebow(i / curve.length))
      .style('fill', 'none');*/

    //const segments = this.g.selectAll('path.seg').data(d3.range(curve.length - 1))
    //segments.enter().append('path.seg');
    //segments.exit().remove();
    //this.g.select('path').remove();
    //const path = this.g.append('path')
    const segments = this.g.selectAll('path.seg').data(d3.range(curve.length - 1))
    segments.exit().remove();
    segments.enter()
      .append('path')
      .attr('class', 'seg')
      .merge(segments)
      //.data(d3.range(curve.length - 1))
      //.join('path')
      .attr('d', (j: number) => this.line([curve[j], curve[j + 1]]))
      .attr('stroke', (j: number) => d3.interpolateCool(j / curve.length))
      //.attr('stroke', 'black')
      .attr('stroke-width', 1);
    //segments.enter().append('path.seg');
    //segments.exit().remove();
      /*this.g.selectAll('path.seg')
      .data(d3.range(curve.length - 1))
      .join('path')
      .attr('class', 'seg')
      .attr('d', (j: number) => this.line([curve[j], curve[j + 1]]))
      //.attr('stroke', (j: number) => d3.interpolateCool(j / curve.length))
      .attr('stroke', 'white')
      .attr('stroke-width', 1);*/
  }
}
