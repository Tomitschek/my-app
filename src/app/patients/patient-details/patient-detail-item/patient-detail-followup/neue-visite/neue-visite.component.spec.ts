import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NeueVisiteComponent} from './neue-visite.component';

describe('NeueVisiteComponent', () => {
  let component: NeueVisiteComponent;
  let fixture: ComponentFixture<NeueVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeueVisiteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeueVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
