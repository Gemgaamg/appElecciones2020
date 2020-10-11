import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaPage } from './historia_clinica_general.page';

describe('HistoriaClinicaPage', () => {
  let component: HistoriaClinicaPage;
  let fixture: ComponentFixture<HistoriaClinicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaClinicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
