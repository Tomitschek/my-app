import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NeueAnamneseComponent} from './neue-anamnese.component';

describe('NeueAnamneseComponent', () => {
  let component: NeueAnamneseComponent;
  let fixture: ComponentFixture<NeueAnamneseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeueAnamneseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeueAnamneseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
