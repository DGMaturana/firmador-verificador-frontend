import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmarRegistrosComponent } from './firmar-registros.component';

describe('FirmarRegistrosComponent', () => {
  let component: FirmarRegistrosComponent;
  let fixture: ComponentFixture<FirmarRegistrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmarRegistrosComponent]
    });
    fixture = TestBed.createComponent(FirmarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
