import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcArrowComponent } from './d3tc-arrow.component';

describe('D3tcArrowComponent', () => {
  let component: D3tcArrowComponent;
  let fixture: ComponentFixture<D3tcArrowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
