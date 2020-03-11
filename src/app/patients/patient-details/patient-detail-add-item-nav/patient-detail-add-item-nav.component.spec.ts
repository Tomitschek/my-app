import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientDetailAddItemNavComponent} from './patient-detail-add-item-nav.component';

describe('PatientDetailAddItemNavComponent', () => {
  let component: PatientDetailAddItemNavComponent;
  let fixture: ComponentFixture<PatientDetailAddItemNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailAddItemNavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailAddItemNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
