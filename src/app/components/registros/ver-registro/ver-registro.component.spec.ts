import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRegistroComponent } from './ver-registro.component';

describe('VerRegistroComponent', () => {
  let component: VerRegistroComponent;
  let fixture: ComponentFixture<VerRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerRegistroComponent]
    });
    fixture = TestBed.createComponent(VerRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
