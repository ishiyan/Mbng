import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrushHandlesComponent } from './brush-handles.component';

describe('BrushHandlesComponent', () => {
  let component: BrushHandlesComponent;
  let fixture: ComponentFixture<BrushHandlesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushHandlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushHandlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
