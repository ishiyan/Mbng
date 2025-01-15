import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Sample4Component } from './sample-4.component';

describe('Sample4Component', () => {
  let component: Sample4Component;
  let fixture: ComponentFixture<Sample4Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [Sample4Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sample4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
