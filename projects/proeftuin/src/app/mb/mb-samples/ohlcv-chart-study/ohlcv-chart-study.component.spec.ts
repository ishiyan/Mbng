import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OhlcvChartStudyComponent } from './ohlcv-chart-study.component';

describe('OhlcvChartStudyComponent', () => {
  let component: OhlcvChartStudyComponent;
  let fixture: ComponentFixture<OhlcvChartStudyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OhlcvChartStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhlcvChartStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
