import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceluserComponent } from './canceluser.component';

describe('CanceluserComponent', () => {
  let component: CanceluserComponent;
  let fixture: ComponentFixture<CanceluserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceluserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
