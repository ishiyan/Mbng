import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcCloseComponent } from './d3tc-close.component';

describe('D3tcCloseComponent', () => {
  let component: D3tcCloseComponent;
  let fixture: ComponentFixture<D3tcCloseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
