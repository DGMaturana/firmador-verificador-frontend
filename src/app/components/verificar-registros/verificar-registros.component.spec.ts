import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarRegistrosComponent } from './verificar-registros.component';

describe('VerificarRegistrosComponent', () => {
  let component: VerificarRegistrosComponent;
  let fixture: ComponentFixture<VerificarRegistrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarRegistrosComponent]
    });
    fixture = TestBed.createComponent(VerificarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
