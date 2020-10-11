import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteDiarioAtencionEmergenciaPage } from './parte_diario_atencion_emergencia.page';

describe('ParteDiarioAtencionEmergenciaPage', () => {
  let component: ParteDiarioAtencionEmergenciaPage;
  let fixture: ComponentFixture<ParteDiarioAtencionEmergenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParteDiarioAtencionEmergenciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteDiarioAtencionEmergenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
