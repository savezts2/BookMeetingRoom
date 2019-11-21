import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMeetingRoom1Component } from './book-meeting-room1.component';

describe('BookMeetingRoom1Component', () => {
  let component: BookMeetingRoom1Component;
  let fixture: ComponentFixture<BookMeetingRoom1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMeetingRoom1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMeetingRoom1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
