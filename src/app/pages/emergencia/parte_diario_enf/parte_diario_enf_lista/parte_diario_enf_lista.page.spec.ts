import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteDiarioEnfListaPage } from './parte_diario_enf_lista.page';

describe('ParteDiarioEnfListaPage', () => {
  let component: ParteDiarioEnfListaPage;
  let fixture: ComponentFixture<ParteDiarioEnfListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParteDiarioEnfListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteDiarioEnfListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
