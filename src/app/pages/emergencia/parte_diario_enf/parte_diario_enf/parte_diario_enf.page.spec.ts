import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteDiarioEnfPage } from './parte_diario_enf.page';

describe('ParteDiarioEnfPage', () => {
  let component: ParteDiarioEnfPage;
  let fixture: ComponentFixture<ParteDiarioEnfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParteDiarioEnfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteDiarioEnfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
