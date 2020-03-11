import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientDetailAnamneseComponent} from './patient-detail-anamnese.component';

describe('PatientDetailAnamneseComponent', () => {
  let component: PatientDetailAnamneseComponent;
  let fixture: ComponentFixture<PatientDetailAnamneseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailAnamneseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailAnamneseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
