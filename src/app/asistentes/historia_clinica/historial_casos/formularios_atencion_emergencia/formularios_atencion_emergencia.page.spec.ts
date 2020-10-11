import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosAtencionEmergenciaPage } from './formularios_atencion_emergencia.page';

describe('FormulariosAtencionEmergenciaPage', () => {
  let component: FormulariosAtencionEmergenciaPage;
  let fixture: ComponentFixture<FormulariosAtencionEmergenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosAtencionEmergenciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosAtencionEmergenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
