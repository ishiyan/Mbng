import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcFinanceTimeComponent } from './d3tc-finance-time.component';

describe('D3tcFinanceTimeComponent', () => {
  let component: D3tcFinanceTimeComponent;
  let fixture: ComponentFixture<D3tcFinanceTimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcFinanceTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcFinanceTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
