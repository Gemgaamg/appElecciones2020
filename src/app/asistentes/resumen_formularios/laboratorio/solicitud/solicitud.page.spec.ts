import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSolicitudLaboratorioPage } from './solicitud.page';

describe('ResumenSolicitudLaboratorioPage', () => {
  let component: ResumenSolicitudLaboratorioPage;
  let fixture: ComponentFixture<ResumenSolicitudLaboratorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenSolicitudLaboratorioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenSolicitudLaboratorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
