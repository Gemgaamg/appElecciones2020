import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionesPorEspecialidadPage } from './atenciones_por_especialidad.page';

describe('AtencionesPorEspecialidadPage', () => {
  let component: AtencionesPorEspecialidadPage;
  let fixture: ComponentFixture<AtencionesPorEspecialidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionesPorEspecialidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionesPorEspecialidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
