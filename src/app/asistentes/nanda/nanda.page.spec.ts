import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NandaPage } from './nanda.page';

describe('NandaPage', () => {
  let component: NandaPage;
  let fixture: ComponentFixture<NandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NandaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
