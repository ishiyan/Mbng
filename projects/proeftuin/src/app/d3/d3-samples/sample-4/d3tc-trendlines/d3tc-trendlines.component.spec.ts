import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcTrendlinesComponent } from './d3tc-trendlines.component';

describe('D3tcTrendlinesComponent', () => {
  let component: D3tcTrendlinesComponent;
  let fixture: ComponentFixture<D3tcTrendlinesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcTrendlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcTrendlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
