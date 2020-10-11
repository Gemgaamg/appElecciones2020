import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucionEnfPage } from './evolucion_enf.page';

describe('EvolucionEnfPage', () => {
  let component: EvolucionEnfPage;
  let fixture: ComponentFixture<EvolucionEnfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolucionEnfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucionEnfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
