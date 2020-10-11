import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenF07CERespuestaPage } from './resumen_f07ce_respuesta.page';

describe('ResumenF07CERespuestaPage', () => {
  let component: ResumenF07CERespuestaPage;
  let fixture: ComponentFixture<ResumenF07CERespuestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenF07CERespuestaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenF07CERespuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
