import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPorEspecialidad } from './historial_especialidad.page';

describe('HistorialPorEspecialidad', () => {
  let component: HistorialPorEspecialidad;
  let fixture: ComponentFixture<HistorialPorEspecialidad>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialPorEspecialidad ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPorEspecialidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
