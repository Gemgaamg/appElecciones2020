import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenF07CESolicitudPage } from './resumen_f07ce_solicitud.page';

describe('ResumenF07CESolicitudPage', () => {
  let component: ResumenF07CESolicitudPage;
  let fixture: ComponentFixture<ResumenF07CESolicitudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenF07CESolicitudPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenF07CESolicitudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
