import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReadersComponent } from './list-readers.component';

describe('ListReadersComponent', () => {
  let component: ListReadersComponent;
  let fixture: ComponentFixture<ListReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
