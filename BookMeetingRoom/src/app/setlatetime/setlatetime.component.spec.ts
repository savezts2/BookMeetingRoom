import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlatetimeComponent } from './setlatetime.component';

describe('SetlatetimeComponent', () => {
  let component: SetlatetimeComponent;
  let fixture: ComponentFixture<SetlatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetlatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
