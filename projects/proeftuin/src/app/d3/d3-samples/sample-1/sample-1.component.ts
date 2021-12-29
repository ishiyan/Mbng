import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd3-sample-1',
  templateUrl: './sample-1.component.html',
  styleUrls: ['./sample-1.component.scss']
})
export class Sample1Component implements OnInit {
  public chartData!: Array<any>;

  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 50)); ++i) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
