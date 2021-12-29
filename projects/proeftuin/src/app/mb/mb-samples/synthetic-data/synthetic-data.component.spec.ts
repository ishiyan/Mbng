import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyntheticDataComponent } from './synthetic-data.component';

describe('Table2Component', () => {
  let component: SyntheticDataComponent;
  let fixture: ComponentFixture<SyntheticDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SyntheticDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntheticDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
