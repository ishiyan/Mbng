import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcZoomingComponent } from './d3tc-zooming.component';

describe('D3tcZoomingComponent', () => {
  let component: D3tcZoomingComponent;
  let fixture: ComponentFixture<D3tcZoomingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcZoomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcZoomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
