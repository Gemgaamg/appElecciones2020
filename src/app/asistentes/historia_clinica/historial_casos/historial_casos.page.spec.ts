import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCasosPage } from './historial_casos.page';

describe('HistorialCasosPage', () => {
  let component: HistorialCasosPage;
  let fixture: ComponentFixture<HistorialCasosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialCasosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCasosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
