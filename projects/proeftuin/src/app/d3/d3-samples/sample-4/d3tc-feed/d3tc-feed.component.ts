import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily';

@Component({
  selector: 'd3-sample-d3tc-feed',
  templateUrl: './d3tc-feed.component.html',
  styleUrls: ['./d3tc-feed.component.scss']
})
export class D3tcFeedComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const data: D3Ohlcv[] = dataOhlcvDaily;

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const sv: any = d3.select(this.element.nativeElement).select('svg').attr('width', w).attr('height', this.svgheight);
    const defs = sv.append('defs');
    const svg = sv.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight - margin.top - margin.bottom;

    const x = d3tc.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const yVolume = d3.scaleLinear().range([y(0) as number, y(0.2) as number]);
    const ohlc = d3tc.plot.ohlc().xScale(x).yScale(y);
    const accessor = ohlc.accessor();
    // Set the accessor to a ohlc accessor so we get highlighted bars.
    const volume = d3tc.plot.volume().accessor(ohlc.accessor()).xScale(x).yScale(yVolume);
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const volumeAxis = d3.axisRight(yVolume).ticks(3).tickFormat(d3.format(',.3s'));

    const timeAnnotation = d3tc.plot.axisannotation().axis(xAxis).orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d')).width(65).translate([0, height]);
    const ohlcAnnotation = d3tc.plot.axisannotation().axis(yAxis).orient('left').format(d3.format(',.2f'));
    const volumeAnnotation = d3tc.plot.axisannotation().axis(volumeAxis).orient('right').width(35);

    defs.append('clipPath').attr('id', 'ohlcClip')
      .append('rect').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height);
    const ohlcSelection = svg.append('g').attr('class', 'ohlc').attr('transform', 'translate(0,0)');
    ohlcSelection.append('g').attr('class', 'volume').attr('clip-path', 'url(#ohlcClip)');
    ohlcSelection.append('g').attr('class', 'candlestick').attr('clip-path', 'url(#ohlcClip)');

    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text('Price');
    svg.append('g').attr('class', 'volume axis');
    svg.append('g').attr('class', 'crosshair ohlc');

    const coordsText = svg.append('text').style('text-anchor', 'end').attr('class', 'coords').attr('x', width - 5).attr('y', 15);
    function move(coords: any) {
      coordsText.text(timeAnnotation.format()(coords.x) + ', ' + ohlcAnnotation.format()(coords.y));
    }
    const crosshair = d3tc.plot.crosshair().xScale(x).yScale(y)
      .xAnnotation(timeAnnotation).yAnnotation([ohlcAnnotation, volumeAnnotation]).on('move', move);

    const feed = data;
    function redraw(dat: D3Ohlcv[]) {
      x.domain(dat.map(accessor.d));
      // Show only 150 points on the plot
      x.zoomable().domain([dat.length - 130, dat.length]);
      // Update y scale min max, only on viewable zoomable.domain()
      y.domain(d3tc.scale.plot.ohlc(dat.slice(dat.length - 130, dat.length)).domain());
      yVolume.domain(d3tc.scale.plot.volume(dat.slice(dat.length - 130, dat.length)).domain());
      // Setup a transition for all that support
      svg.transition() // Disable transition for now, each is only for transitions
        .each(function() {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          // @ts-ignore
          const selection = d3.select(this);
          selection.select('g.x.axis').call(xAxis as any);
          selection.select('g.y.axis').call(yAxis as any);
          selection.select('g.volume.axis').call(volumeAxis as any);
          selection.select('g.candlestick').datum(dat).call(ohlc);
          selection.select('g.volume').datum(dat).call(volume);
          svg.select('g.crosshair.ohlc').call(crosshair);
        });
      // Set next timer expiry
      setTimeout(() => {
        let newDat;
        if (dat.length < feed.length) {
          // Simulate a daily feed
          newDat = feed.slice(0, dat.length + 1);
        } else {
          // Simulate intra day updates when no feed is left
          const last = dat[dat.length - 1];
          // Last must be between high and low
          last.close = Math.round(((last.high - last.low) * Math.random()) * 10) / 10 + last.low;
          newDat = dat;
        }
        redraw(newDat);
      }, (Math.random() * 1000) + 400); // Randomly pick an interval to update the chart
    }

    // Start off an initial set of data
    redraw(feed.slice(0, 163));
  }
}
