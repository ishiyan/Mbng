import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Sample7Component } from './sample-7.component';

describe('Sample7Component', () => {
  let component: Sample7Component;
  let fixture: ComponentFixture<Sample7Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Sample7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sample7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
