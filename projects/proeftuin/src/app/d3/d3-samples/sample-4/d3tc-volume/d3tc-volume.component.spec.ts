import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcVolumeComponent } from './d3tc-volume.component';

describe('D3tcVolumeComponent', () => {
  let component: D3tcVolumeComponent;
  let fixture: ComponentFixture<D3tcVolumeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
