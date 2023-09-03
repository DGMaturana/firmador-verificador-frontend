import { Component, OnInit, TemplateRef, computed, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Registro } from 'src/app/components/registros/Registro';
import { RegistrosService } from 'src/app/services/registros.service';
import { DescargarCertificadosComponent } from '../../components/descargar-certificados/descargar-certificados.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-firmar',
  templateUrl: './firmar.component.html',
  styleUrls: ['./firmar.component.css']
})
export class FirmarComponent {
  activeNavItem: number = 1;

  registros?: Registro[];

  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );

  estanCargadosRegistros: boolean = false;
  formularioRegistros?: FormGroup; 
  constructor(private fb: FormBuilder,
              private registrosService: RegistrosService,
              private modalService: NgbModal
              ){

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
    const {nombre, rut, empresa, equipoCargo, fechaCertificacion, resultadoEvaluacion, fechaExpiracion, notaFinal, codigo, certificado }  = registro;

    const registroForm = this.fb.group({
      nombre: [nombre || ''],
      rut: [rut || ''  ],
      codigo: [codigo || '' ],
      empresa: [empresa || '' ],
      equipoCargo: [equipoCargo || '' ],
      fechaCertificacion: [fechaCertificacion || '' ],
      fechaExpiracion: [fechaExpiracion || '' ],
      notaFinal: [notaFinal || ''],
      resultadoEvaluacion: [resultadoEvaluacion || '' ],
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
    try {


      const respuesta = await this.registrosService.firmarRegistros(this.formularioRegistros?.value.registros);
      if(!respuesta){
        throw ('No se obtuvo respuesta desde el servidor');
      }
      const {done, registros} = respuesta;
      if(!done){
        throw ('No se obtuvieron registros certificados.');
      }

      const modal = this.modalService.open(DescargarCertificadosComponent);
      modal.componentInstance.registros = registros;
          
    } catch (error: any) {
      console.log(error)
      Swal.fire('Atención', error?.error?.msg || '', 'warning')
    }
  }

  onFileChangeEvent($event: any){
    const newRegistro = $event.registro;
    const {nombre, rut, empresa, equipoCargo, fechaCertificacion, resultadoEvaluacion, fechaExpiracion, notaFinal, codigo, certificado }  = newRegistro;
    if(!certificado){
      throw ('Error, no hay certificado.')
    } 
    const registroForm = this.fb.group({
      nombre: [nombre || ''],
      rut: [rut || ''  ],
      codigo: [codigo || '' ],
      empresa: [empresa || '' ],
      equipoCargo: [equipoCargo || '' ],
      fechaCertificacion: [fechaCertificacion || '' ],
      fechaExpiracion: [fechaExpiracion || '' ],
      notaFinal: [notaFinal || ''],
      resultadoEvaluacion: [resultadoEvaluacion || '' ],
      certificado: [certificado || null]
    })
    const registros = this.formularioRegistros?.get('registros') as FormArray;
    const registro = registros.at($event.index)

    registro.setValue(registroForm.value)
  
    
  }
}
