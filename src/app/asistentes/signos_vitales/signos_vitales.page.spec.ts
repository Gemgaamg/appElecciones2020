import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignosVitalesPage } from './signos_vitales.page';

describe('SignosVitalesPage', () => {
  let component: SignosVitalesPage;
  let fixture: ComponentFixture<SignosVitalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignosVitalesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignosVitalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
