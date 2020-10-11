import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CntbomediPage } from './cntbomedi.page';

describe('CntbofarmaPage', () => {
  let component: CntbomediPage;
  let fixture: ComponentFixture<CntbomediPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CntbomediPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CntbomediPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
