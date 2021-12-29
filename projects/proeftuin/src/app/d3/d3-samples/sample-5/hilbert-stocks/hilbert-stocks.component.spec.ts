import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HilbertStocksComponent } from './hilbert-stocks.component';

describe('HilbertStocksComponent', () => {
  let component: HilbertStocksComponent;
  let fixture: ComponentFixture<HilbertStocksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HilbertStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HilbertStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
