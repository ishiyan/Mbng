import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Table12Component } from './table12.component';

describe('Table12Component', () => {
  let component: Table12Component;
  let fixture: ComponentFixture<Table12Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Table12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Table12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
