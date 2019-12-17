import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomnameComponent } from './editroomname.component';

describe('EditroomnameComponent', () => {
  let component: EditroomnameComponent;
  let fixture: ComponentFixture<EditroomnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditroomnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditroomnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
