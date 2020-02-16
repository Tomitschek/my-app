import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientDetailFollowupComponent} from './patient-detail-followup.component';

describe('PatientDetailFollowupComponent', () => {
  let component: PatientDetailFollowupComponent;
  let fixture: ComponentFixture<PatientDetailFollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailFollowupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
