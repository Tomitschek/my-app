import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NeueOpComponent} from './neue-op.component';

describe('NeueOpComponent', () => {
  let component: NeueOpComponent;
  let fixture: ComponentFixture<NeueOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeueOpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeueOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
