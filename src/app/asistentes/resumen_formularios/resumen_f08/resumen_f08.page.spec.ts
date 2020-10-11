import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenF08Page } from './resumen_f08.page';

describe('ResumenF08Page', () => {
  let component: ResumenF08Page;
  let fixture: ComponentFixture<ResumenF08Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenF08Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenF08Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
