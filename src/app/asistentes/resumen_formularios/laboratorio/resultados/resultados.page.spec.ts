import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosLaboratorioPage } from './resultados.page';

describe('ResultadosLaboratorioPage', () => {
  let component: ResultadosLaboratorioPage;
  let fixture: ComponentFixture<ResultadosLaboratorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosLaboratorioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosLaboratorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
