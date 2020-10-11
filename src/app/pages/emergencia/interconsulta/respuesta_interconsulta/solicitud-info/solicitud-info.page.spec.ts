import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudInfoPage } from './solicitud-info.page';

describe('SolicitudInfoPage', () => {
  let component: SolicitudInfoPage;
  let fixture: ComponentFixture<SolicitudInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
