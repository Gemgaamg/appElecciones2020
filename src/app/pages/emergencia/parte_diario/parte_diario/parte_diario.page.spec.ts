import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteDiarioPage } from './parte_diario.page';

describe('CntbofarmaPage', () => {
  let component: ParteDiarioPage;
  let fixture: ComponentFixture<ParteDiarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParteDiarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteDiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
