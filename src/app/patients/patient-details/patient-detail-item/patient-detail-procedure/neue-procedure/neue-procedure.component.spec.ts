import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NeueProcedureComponent} from './neue-procedure.component';

describe('NeueProcedureComponent', () => {
  let component: NeueProcedureComponent;
  let fixture: ComponentFixture<NeueProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeueProcedureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeueProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
