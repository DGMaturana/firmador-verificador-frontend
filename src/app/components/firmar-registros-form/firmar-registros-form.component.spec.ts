import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmarRegistrosFormComponent } from './firmar-registros-form.component';

describe('FirmarRegistrosFormComponent', () => {
  let component: FirmarRegistrosFormComponent;
  let fixture: ComponentFixture<FirmarRegistrosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmarRegistrosFormComponent]
    });
    fixture = TestBed.createComponent(FirmarRegistrosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
