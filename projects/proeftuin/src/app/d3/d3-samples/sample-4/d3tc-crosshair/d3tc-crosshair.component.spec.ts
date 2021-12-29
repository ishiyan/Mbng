import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcCrosshairComponent } from './d3tc-crosshair.component';

describe('D3tcCrosshairComponent', () => {
  let component: D3tcCrosshairComponent;
  let fixture: ComponentFixture<D3tcCrosshairComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcCrosshairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcCrosshairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
