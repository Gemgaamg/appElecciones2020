import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaInterconsultaPage } from './respuesta_interconsulta.page';

describe('CntbofarmaPage', () => {
  let component: RespuestaInterconsultaPage;
  let fixture: ComponentFixture<RespuestaInterconsultaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaInterconsultaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaInterconsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
