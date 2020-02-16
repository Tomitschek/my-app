import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatentsListTableComponent} from './patents-list-table.component';

describe('PatentsListTableComponent', () => {
  let component: PatentsListTableComponent;
  let fixture: ComponentFixture<PatentsListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatentsListTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
