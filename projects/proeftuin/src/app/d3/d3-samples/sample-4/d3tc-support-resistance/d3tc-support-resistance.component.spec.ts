import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcSupportResistanceComponent } from './d3tc-support-resistance.component';

describe('D3tcSupportResistanceComponent', () => {
  let component: D3tcSupportResistanceComponent;
  let fixture: ComponentFixture<D3tcSupportResistanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcSupportResistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcSupportResistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
