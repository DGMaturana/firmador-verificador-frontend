import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrosService } from 'src/app/services/registros.service';
import { Registro } from '../registros/Registro';

@Component({
  selector: 'app-firmar-registros-form',
  templateUrl: './firmar-registros-form.component.html',
  styleUrls: ['./firmar-registros-form.component.css']
})
export class FirmarRegistrosFormComponent implements OnInit {

  @Input() registro?: Registro;
  formulario: FormGroup | undefined;

  constructor(private fb: FormBuilder,
              private registrosService: RegistrosService          
    ){

  }
  ngOnInit(): void {
    console.log(('hola mundo'));

    this.initForm();
  }

  initForm(){
    if(!this.registro) {
      return;
    }
    
    const {NOMBRE, RUT, EMPRESA, EQUIPO_O_CARGO, FECHA_CERTIFICACION, RESULTADO_EVALUACION, FECHA_EXPIRACION, NOTA_FINAL, CODIGO } = this.registro
    if(!FECHA_CERTIFICACION){
      return;
    }
    // const fechaCertificacion = FECHA_CERTIFICACION.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).split(' ').join('-');
    // console.log(fechaCertificacion)
     this.formulario = this.fb.group({
      nombre: [ NOMBRE || ''],
      rut: [ RUT || ''],
      empresa: [ EMPRESA || '' ],
      equipoCargo: [ EQUIPO_O_CARGO || '' ],
      fechaCertificacion: [ FECHA_CERTIFICACION || '' ],
      resultadoEvaluacion:[ RESULTADO_EVALUACION || ''],
      fechaExpiracion:[ FECHA_EXPIRACION || ''],
      notaFinal: [ NOTA_FINAL || ''],
      codigo:[ CODIGO || '']
      
     })
  }

  obtenerRegistros(){
    this.registrosService.obtenerRegistros({})
  }
}
