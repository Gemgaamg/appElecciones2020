import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDietaPage } from './info_dieta.page';

describe('InfoDietaPage', () => {
  let component: InfoDietaPage;
  let fixture: ComponentFixture<InfoDietaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDietaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDietaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
