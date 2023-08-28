import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Registro } from 'src/app/components/registros/Registro';
import { RegistrosService } from 'src/app/services/registros.service';

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
  constructor(private fb: FormBuilder,
              private registrosService: RegistrosService){

  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.formularioRegistros = this.fb.group({
      registros: this.fb.array([])
    })
  }

  addRegistro(registro: Registro){
    if(!registro) return;
    const { NOMBRE, RUT, CODIGO, EMPRESA, EQUIPO_O_CARGO, FECHA_CERTIFICACION, FECHA_EXPIRACION, NOTA_FINAL, RESULTADO_EVALUACION, certificado} = registro;

    const registroForm = this.fb.group({
      nombre: [NOMBRE || ''],
      rut: [RUT ],
      codigo: [CODIGO],
      empresa: [EMPRESA],
      equipoCargo: [EQUIPO_O_CARGO],
      fechaCertificacion: [FECHA_CERTIFICACION],
      fechaExpiracion: [FECHA_EXPIRACION],
      notaFinal: [NOTA_FINAL],
      resultadoEvaluacion: [RESULTADO_EVALUACION],
      certificado: [certificado || null]
    })

    const registrosControl = this.formularioRegistros?.controls['registros'] as FormArray;
    registrosControl.push(registroForm)
  }
  
  onObtenerRegistros(registros: Registro[]){
    if(!registros) throw 'No se obtuvieron registros.'
    this.registros = registros;
    
    for( const registro of registros ){
      this.addRegistro(registro);
    }

    this.activeNavItem = 2;
  }

  async firmar(){
    console.log(this.formularioRegistros?.value)
    const respuesta = await this.registrosService.firmarRegistros(this.formularioRegistros?.value.registros);
    console.log(respuesta)
  }

  onFileChangeEvent($event: any){
    const newRegistro = $event.registro;
    const { NOMBRE, RUT, CODIGO, EMPRESA, EQUIPO_O_CARGO, FECHA_CERTIFICACION, FECHA_EXPIRACION, NOTA_FINAL, RESULTADO_EVALUACION, certificado} = newRegistro;
    if(!certificado){
      throw ('Error, no hay certificado.')
    } 
    const registroForm = this.fb.group({
      nombre: [NOMBRE || ''],
      rut: [RUT ],
      codigo: [CODIGO],
      empresa: [EMPRESA],
      equipoCargo: [EQUIPO_O_CARGO],
      fechaCertificacion: [FECHA_CERTIFICACION],
      fechaExpiracion: [FECHA_EXPIRACION],
      notaFinal: [NOTA_FINAL],
      resultadoEvaluacion: [RESULTADO_EVALUACION],
      certificado: [certificado || null]
    })
    const registros = this.formularioRegistros?.get('registros') as FormArray;
    const registro = registros.at($event.index)

    registro.setValue(registroForm.value)
  
    
  }
}
