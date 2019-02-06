import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewitemPage } from './newitem.page';

describe('NewitemPage', () => {
  let component: NewitemPage;
  let fixture: ComponentFixture<NewitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewitemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
