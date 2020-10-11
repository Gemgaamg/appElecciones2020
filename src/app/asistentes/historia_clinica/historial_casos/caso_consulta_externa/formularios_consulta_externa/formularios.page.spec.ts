import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosConsultaExternaPage } from './formularios.page';

describe('FormulariosConsultaExternaPage', () => {
  let component: FormulariosConsultaExternaPage;
  let fixture: ComponentFixture<FormulariosConsultaExternaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosConsultaExternaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosConsultaExternaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
