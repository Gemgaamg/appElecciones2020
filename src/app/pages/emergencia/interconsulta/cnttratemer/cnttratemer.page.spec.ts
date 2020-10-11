import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnttratemerPage } from './cnttratemer.page';

describe('CntbofarmaPage', () => {
  let component: CnttratemerPage;
  let fixture: ComponentFixture<CnttratemerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnttratemerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnttratemerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
