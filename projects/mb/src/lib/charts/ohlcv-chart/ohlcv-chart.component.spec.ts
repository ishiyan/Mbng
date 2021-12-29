import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OhlcvChartComponent } from './ohlcv-chart.component';

describe('OhlcvChartComponent', () => {
  let component: OhlcvChartComponent;
  let fixture: ComponentFixture<OhlcvChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OhlcvChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhlcvChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
