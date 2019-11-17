import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientenComponent } from './patienten.component';

describe('PatientenComponent', () => {
  let component: PatientenComponent;
  let fixture: ComponentFixture<PatientenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
