import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsPage } from './list-items.page';

describe('ListItemsPage', () => {
  let component: ListItemsPage;
  let fixture: ComponentFixture<ListItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
