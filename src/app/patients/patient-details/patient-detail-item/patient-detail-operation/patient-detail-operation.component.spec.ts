import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientDetailOperationComponent} from './patient-detail-operation.component';

describe('PatientDetailOperationComponent', () => {
  let component: PatientDetailOperationComponent;
  let fixture: ComponentFixture<PatientDetailOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailOperationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
