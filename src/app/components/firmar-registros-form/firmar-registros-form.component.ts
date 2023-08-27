import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() formularioRegistros? : FormGroup;
  @Input() index?: number;
  @Output() onFileChangeEvent = new EventEmitter()
  formulario: FormGroup | undefined;

  constructor(private fb: FormBuilder,
              private registrosService: RegistrosService,
    ){

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    if(!this.registro) {
      return;
    }
    
    const {NOMBRE, RUT, EMPRESA, EQUIPO_O_CARGO, FECHA_CERTIFICACION, RESULTADO_EVALUACION, FECHA_EXPIRACION, NOTA_FINAL, CODIGO, certificado } = this.registro
    if(!FECHA_CERTIFICACION){
      return;
    }
     this.formulario = this.fb.group({
      nombre: [ NOMBRE || ''],
      rut: [ RUT || ''],
      empresa: [ EMPRESA || '' ],
      equipoCargo: [ EQUIPO_O_CARGO || '' ],
      fechaCertificacion: [ FECHA_CERTIFICACION || '' ],
      resultadoEvaluacion:[ RESULTADO_EVALUACION || ''],
      fechaExpiracion:[ FECHA_EXPIRACION || ''],
      notaFinal: [ NOTA_FINAL || ''],
      codigo:[ CODIGO || ''],
      certificado: [certificado || '']
      
     })
  }

  onFileChange(event: any){
    try{
      const file = (event?.target?.files[0]) ;

      this.registro!.certificado = file;
      const registro =  this.formulario?.value

      this.onFileChangeEvent.emit(registro)

      

    }catch(error){
      console.log(error)
      throw error;
    }
  }

}
