import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { VerificarCertificadoEquipoComponent } from '../../equipos/verificar-certificado-equipo/verificar-certificado-equipo.component';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { VerDiplomaComponent } from '../../diplomas/ver-diploma/ver-diploma.component';
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
    private diplomasService: DiplomasService,
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
      this.loading = true;
      const codigo: string = this.form?.get('codigo')?.value;
      const codigoDividido = codigo.split('-');
      if (!codigo) throw 'Por favor ingrese código de registro.';
      const isEquipo = codigoDividido[0].toUpperCase() === "EQU";
      const isDiploma = codigoDividido[0].toUpperCase() === "DIP";
      const isCertificado = codigoDividido.length === 2 && codigoDividido.every((parte) => !_.isNaN(Number(parte)));
      if ( isEquipo ){
        const respuesta = await this.certificadoService.veritificarCertificadoInspeccionVehiculos(codigo)
        if(!respuesta?.certificado) throw "Código no válido";
        const modal = this.modalService.open(VerificarCertificadoEquipoComponent, {
          size: 'lg',
          animation: true
        });
        modal.componentInstance.certificadoEquipo = respuesta.certificado;
        this.loading = false
        return;
      }
      if ( isDiploma ){
        const respuesta = await this.diplomasService.verificarDiploma(codigo);
        if (!respuesta.done ) {
          throw respuesta.message || 'Código no válido.';
        }
        const { diploma } = respuesta;
        const modal = this.modalService.open(VerDiplomaComponent, {
          size: 'lg',
          animation: true
        });
        modal.componentInstance.diploma = diploma;
        this.loading = false;
        return;
      }
      if( isCertificado ){
        const respuesta = await this.certificadoService.verificarCertificado(codigo);
        if(!respuesta) throw "Código no válido";
        const { certificado } = respuesta;
        const modal = this.modalService.open(VerCertificadoComponent, {
          size: 'lg',
          animation: true
        })
        modal.componentInstance.certificado = certificado;
        this.loading = false;
        return;

      } 
      const respuesta = await this.registrosService.verificarRegistro(codigo);
      if (!respuesta?.done) throw 'Código no válido.';
      const { registro } = respuesta;
      const modal = this.modalService.open(VerRegistroComponent, {
        size: 'lg',
        animation: true,
      });
      modal.componentInstance.registro = registro;
      this.loading = false;
    } catch (error: any) {
      const errorMessage = error?.error?.message || error;
      Swal.fire({ title: 'Atención', text: errorMessage, icon: 'warning', confirmButtonColor: '#0d6efd', showCloseButton: true});
      this.loading = false;
    }
  }
}
