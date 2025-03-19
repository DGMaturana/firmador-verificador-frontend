import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarDiplomasComponent } from './generar-diplomas.component';

describe('GenerarDiplomasComponent', () => {
  let component: GenerarDiplomasComponent;
  let fixture: ComponentFixture<GenerarDiplomasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarDiplomasComponent]
    });
    fixture = TestBed.createComponent(GenerarDiplomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
