import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcTradeArrowsComponent } from './d3tc-trade-arrows.component';

describe('D3tcTradeArrowsComponent', () => {
  let component: D3tcTradeArrowsComponent;
  let fixture: ComponentFixture<D3tcTradeArrowsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcTradeArrowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcTradeArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
