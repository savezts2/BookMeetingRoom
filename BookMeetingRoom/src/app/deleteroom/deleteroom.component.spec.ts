import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteroomComponent } from './deleteroom.component';

describe('DeleteroomComponent', () => {
  let component: DeleteroomComponent;
  let fixture: ComponentFixture<DeleteroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
