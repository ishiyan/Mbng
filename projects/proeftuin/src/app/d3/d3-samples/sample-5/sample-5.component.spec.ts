import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Sample5Component } from './sample-5.component';

describe('Sample5Component', () => {
  let component: Sample5Component;
  let fixture: ComponentFixture<Sample5Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Sample5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sample5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
