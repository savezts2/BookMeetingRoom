import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroombyadminComponent } from './addroombyadmin.component';

describe('AddroombyadminComponent', () => {
  let component: AddroombyadminComponent;
  let fixture: ComponentFixture<AddroombyadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddroombyadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddroombyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
