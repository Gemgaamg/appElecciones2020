import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenF053CEPage } from './resumen_f053ce.page';

describe('ResumenF053Page', () => {
  let component: ResumenF053CEPage;
  let fixture: ComponentFixture<ResumenF053CEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenF053CEPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenF053CEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
