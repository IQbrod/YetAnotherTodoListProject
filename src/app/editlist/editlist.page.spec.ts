import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlistPage } from './editlist.page';

describe('EditlistPage', () => {
  let component: EditlistPage;
  let fixture: ComponentFixture<EditlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
