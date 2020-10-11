import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenF05Page } from './resumen_f05.page';

describe('ResumenF05Page', () => {
  let component: ResumenF05Page;
  let fixture: ComponentFixture<ResumenF05Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenF05Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenF05Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
