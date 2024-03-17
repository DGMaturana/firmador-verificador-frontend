import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrosService } from 'src/app/services/registros.service';
import Swal from 'sweetalert2';
import { VerRegistroComponent } from '../ver-registro/ver-registro.component';
import * as _ from 'underscore';
import { CertificadosService } from 'src/app/services/certificados.service';
import { VerCertificadoComponent } from '../../certificados/ver-certificado/ver-certificado.component';
@Component({
  selector: 'app-verificar-registros',
  templateUrl: './verificar-registros.component.html',
  styleUrls: ['./verificar-registros.component.css'],
})
export class VerificarRegistrosComponent implements OnInit {
  form?: FormGroup;
  codigo?: string;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private certificadoService: CertificadosService,
    private registrosService: RegistrosService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (!params['codigo']) return;
      this.codigo = params['codigo'];
    });



    this.form = this.fb.group({
      codigo: [this.codigo || '', Validators.required],
    });
  }

  async verificar() {
    try {
      console.log("verificar! ")
      this.loading = true;
      const codigo: string = this.form?.get('codigo')?.value;
      const codigoDividido = codigo.split('-');
      let tipoCodigo: string;
      if (!codigo) throw 'Por favor ingrese código de registro.';
      if( codigoDividido.length === 2 && codigoDividido.every((parte) => !_.isNaN(Number(parte)))){
        tipoCodigo = "certificado";
      } else {
        tipoCodigo = "registro"
      }
      console.log({codigo, split: codigo.split('-'), tipoCodigo, firstElement: Number(codigo[0])});
      if(tipoCodigo === "certificado"){
        const respuesta = await this.certificadoService.verificarCertificado(codigo);
        if(!respuesta) throw "Código no válido";
        console.log({respuesta});
        const { certificado } = respuesta;
        const modal = this.modalService.open(VerCertificadoComponent, {
          size: 'lg',
          animation: true
        })
        modal.componentInstance.certificado = certificado;
        this.loading = false;

      } else {
        const respuesta = await this.registrosService.verificarRegistro(codigo);
        if (!respuesta?.done) throw 'Código no válido.';
        const { registro } = respuesta;
        const modal = this.modalService.open(VerRegistroComponent, {
          size: 'lg',
          animation: true,
        });
        modal.componentInstance.registro = registro;
        this.loading = false;

      }
 


    } catch (error: any) {
      Swal.fire({ title: 'Atención', text: error, icon: 'warning', confirmButtonColor: '#0d6efd', showCloseButton: true});
      this.loading = false;
    }
  }
}
