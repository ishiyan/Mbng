import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcAxisAnnotationsComponent } from './d3tc-axis-annotations.component';

describe('D3tcAxisAnnotationsComponent', () => {
  let component: D3tcAxisAnnotationsComponent;
  let fixture: ComponentFixture<D3tcAxisAnnotationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcAxisAnnotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcAxisAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
