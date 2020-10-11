import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoConsultaExternaPage } from './caso.page';

describe('CasoConsultaExternaPage', () => {
  let component: CasoConsultaExternaPage;
  let fixture: ComponentFixture<CasoConsultaExternaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoConsultaExternaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoConsultaExternaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
