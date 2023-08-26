import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Registro } from 'src/app/components/registros/Registro';

@Component({
  selector: 'app-firmar',
  templateUrl: './firmar.component.html',
  styleUrls: ['./firmar.component.css']
})
export class FirmarComponent {
  activeNavItem: number = 1;

  registros?: Registro[];

  estanCargadosRegistros: boolean = false;
  formularioRegistros?: FormGroup; 
  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.formularioRegistros = this.fb.group({

    })
  }

  onObtenerRegistros(registros: Registro[]){
    this.registros = registros;
  }
  estan(){
    console.log(this.estanCargadosRegistros);
  }
}
