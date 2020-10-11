import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cie10Page } from './cie10.page';

describe('Cie10Page', () => {
  let component: Cie10Page;
  let fixture: ComponentFixture<Cie10Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cie10Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cie10Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
