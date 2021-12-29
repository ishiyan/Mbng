import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcHorizonChartBandsComponent } from './d3tc-horizon-chart-bands.component';

describe('D3tcHorizonChartBandsComponent', () => {
  let component: D3tcHorizonChartBandsComponent;
  let fixture: ComponentFixture<D3tcHorizonChartBandsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcHorizonChartBandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcHorizonChartBandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
