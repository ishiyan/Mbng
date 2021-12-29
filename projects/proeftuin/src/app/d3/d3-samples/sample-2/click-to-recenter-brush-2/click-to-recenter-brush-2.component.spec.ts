import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClickToRecenterBrush2Component } from './click-to-recenter-brush-2.component';

describe('ClickToRecenterBrush2Component', () => {
  let component: ClickToRecenterBrush2Component;
  let fixture: ComponentFixture<ClickToRecenterBrush2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickToRecenterBrush2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickToRecenterBrush2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
