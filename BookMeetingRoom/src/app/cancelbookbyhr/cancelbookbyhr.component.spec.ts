import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelbookbyhrComponent } from './cancelbookbyhr.component';

describe('CancelbookbyhrComponent', () => {
  let component: CancelbookbyhrComponent;
  let fixture: ComponentFixture<CancelbookbyhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelbookbyhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelbookbyhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
