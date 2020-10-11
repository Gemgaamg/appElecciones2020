import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenRecetaPage } from './receta.page';

describe('ResumenRecetaPage', () => {
  let component: ResumenRecetaPage;
  let fixture: ComponentFixture<ResumenRecetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenRecetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
