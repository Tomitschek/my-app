import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientDetailItemComponent} from './patient-detail-item.component';

describe('PatientDetailItemComponent', () => {
  let component: PatientDetailItemComponent;
  let fixture: ComponentFixture<PatientDetailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
