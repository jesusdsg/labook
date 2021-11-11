import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReadersComponent } from './add-readers.component';

describe('AddReadersComponent', () => {
  let component: AddReadersComponent;
  let fixture: ComponentFixture<AddReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
