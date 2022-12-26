import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ruta404Component } from './ruta404.component';

describe('Ruta404Component', () => {
  let component: Ruta404Component;
  let fixture: ComponentFixture<Ruta404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ruta404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ruta404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
