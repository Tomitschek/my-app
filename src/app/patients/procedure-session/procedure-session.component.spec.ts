import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcedureSessionComponent} from './procedure-session.component';

describe('ProcedureSessionComponent', () => {
  let component: ProcedureSessionComponent;
  let fixture: ComponentFixture<ProcedureSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureSessionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
