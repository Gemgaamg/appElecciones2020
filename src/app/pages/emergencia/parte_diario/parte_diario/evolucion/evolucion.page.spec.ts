import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucionPage } from './evolucion.page';

describe('EvolucionPage', () => {
  let component: EvolucionPage;
  let fixture: ComponentFixture<EvolucionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolucionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
