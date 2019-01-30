import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlistPage } from './newlist.page';

describe('NewlistPage', () => {
  let component: NewlistPage;
  let fixture: ComponentFixture<NewlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
