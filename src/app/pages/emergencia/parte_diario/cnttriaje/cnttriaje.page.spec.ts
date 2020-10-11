import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnttriajePage } from './cnttriaje.page';

describe('CnttriajePage', () => {
  let component: CnttriajePage;
  let fixture: ComponentFixture<CnttriajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnttriajePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnttriajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
