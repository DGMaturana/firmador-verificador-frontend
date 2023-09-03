import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrosService } from 'src/app/services/registros.service';
import { Registro } from '../Registro';

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
    
    const {nombre, rut, empresa, equipoCargo, fechaCertificacion, resultadoEvaluacion, fechaExpiracion, notaFinal, codigo, certificado } = this.registro
    if(!fechaCertificacion){
      return;
    }
     this.formulario = this.fb.group({
      nombre: [ nombre || ''],
      rut: [ rut || ''],
      empresa: [ empresa || '' ],
      equipoCargo: [ equipoCargo || '' ],
      fechaCertificacion: [ fechaCertificacion || '' ],
      resultadoEvaluacion:[ resultadoEvaluacion || ''],
      fechaExpiracion:[ fechaExpiracion || ''],
      notaFinal: [ notaFinal || ''],
      codigo:[ codigo || ''],
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
