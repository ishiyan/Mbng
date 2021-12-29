import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Sample8Component } from './sample-8.component';

describe('Sample8Component', () => {
  let component: Sample8Component;
  let fixture: ComponentFixture<Sample8Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Sample8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sample8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
