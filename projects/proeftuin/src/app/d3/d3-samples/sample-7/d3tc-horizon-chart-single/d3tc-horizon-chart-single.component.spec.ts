import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcHorizonChartSingleComponent } from './d3tc-horizon-chart-single.component';

describe('D3tcHorizonChartSingleComponent', () => {
  let component: D3tcHorizonChartSingleComponent;
  let fixture: ComponentFixture<D3tcHorizonChartSingleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcHorizonChartSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcHorizonChartSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
