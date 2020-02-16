import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientDetailProcedureComponent} from './patient-detail-procedure.component';

describe('PatientDetailProcedureComponent', () => {
  let component: PatientDetailProcedureComponent;
  let fixture: ComponentFixture<PatientDetailProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailProcedureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
