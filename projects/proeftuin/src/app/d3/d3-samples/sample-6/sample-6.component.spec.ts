import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Sample6Component } from './sample-6.component';

describe('Sample6Component', () => {
  let component: Sample6Component;
  let fixture: ComponentFixture<Sample6Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Sample6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sample6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
