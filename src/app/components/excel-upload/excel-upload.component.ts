import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegistrosService } from '../../services/registros.service';
import { CertificadosService } from 'src/app/services/certificados.service';
import Swal from 'sweetalert2';
import { Certificado } from 'src/interfaces/Certificado';
@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css'],
})
export class ExcelUploadComponent {

  @Input() form?: FormGroup;
  @Input() tipoDeArchivo?: 'registros' | 'certificados' | 'inspeccion-vehiculos';
  @Input() loading: boolean = false;;
  @Output() onObtenerRegistros = new EventEmitter();
  @Output() onObtenerCertificados: EventEmitter<{certificados: Certificado[], file: File}> = new EventEmitter();
  @Output() onObtenerInspeccionVehiculos = new EventEmitter();
  allowedExtensions: string[] = ['xls', 'xlsx'];
  constructor(
    private registroService: RegistrosService,
    private certificadoService: CertificadosService
  ) {}

  onChange(event: any) {
    switch (this.tipoDeArchivo) {
      case 'registros':
        this.obtenerRegistros(event);
        break;

      case 'certificados':
        this.leerCertificados(event);
        // this.generarCertificados(event)
        break;

      case 'inspeccion-vehiculos':
        this.obtenerInspeccionVehiculos(event);
        break;

      default:
        break;
    }
  }



 async leerCertificados(event: any) {
    try {
      if (event.target.files && event.target.files.length) {
        const file: File = event.target?.files[0];
        const hojaCertificados = await this.certificadoService.leerCertificados(file);
        if(!hojaCertificados){
          throw new Error("No se obtuvo hoja de certificados")
        }
        this.onObtenerCertificados.emit({certificados: hojaCertificados, file});
      }
    } catch (error: any) {
      Swal.fire("Atención", error.message, "warning");
    }
  }

  async obtenerRegistros(event: any) {
    try {
      if (event.target.files && event.target.files.length) {
        const file = event.target?.files[0];

        const { registros } = await this.registroService.obtenerRegistros(file);
        if (registros) {
          this.onObtenerRegistros.emit(registros);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async obtenerInspeccionVehiculos(event: any) {
    console.log("obtenerInspeccionVehiculos", event);
    try {
      if (event.target.files && event.target.files.length) {
        const file = event.target?.files[0];

        const {registros } = await this.certificadoService.leerInspeccionVehiculos(file);
        console.log("registros", registros);
        if (registros) {
           this.onObtenerInspeccionVehiculos.emit(registros);
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
