import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CntbofarmaPage } from './cntbofarma.page';

describe('CntbofarmaPage', () => {
  let component: CntbofarmaPage;
  let fixture: ComponentFixture<CntbofarmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CntbofarmaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CntbofarmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
