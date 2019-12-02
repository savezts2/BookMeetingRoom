import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteuserbyadminComponent } from './deleteuserbyadmin.component';

describe('DeleteuserbyadminComponent', () => {
  let component: DeleteuserbyadminComponent;
  let fixture: ComponentFixture<DeleteuserbyadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteuserbyadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteuserbyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
