import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcMultipleSmallPlotsComponent } from './d3tc-multiple-small-plots.component';

describe('D3tcMultipleSmallPlotsComponent', () => {
  let component: D3tcMultipleSmallPlotsComponent;
  let fixture: ComponentFixture<D3tcMultipleSmallPlotsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcMultipleSmallPlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcMultipleSmallPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
