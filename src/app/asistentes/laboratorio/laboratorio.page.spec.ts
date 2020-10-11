import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioPage } from './laboratorio.page';

describe('LaboratorioPage', () => {
  let component: LaboratorioPage;
  let fixture: ComponentFixture<LaboratorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratorioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
