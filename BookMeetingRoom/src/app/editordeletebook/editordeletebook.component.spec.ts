import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditordeletebookComponent } from './editordeletebook.component';

describe('EditordeletebookComponent', () => {
  let component: EditordeletebookComponent;
  let fixture: ComponentFixture<EditordeletebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditordeletebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditordeletebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
