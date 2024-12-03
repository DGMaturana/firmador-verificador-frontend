import { Component } from '@angular/core';
import { CertificadosService } from 'src/app/services/certificados.service';
import { CertificadoInspeccionVehiculo } from 'src/interfaces/Certificado';
import { saveAs } from 'file-saver-es';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-inspeccion-vehiculos',
  templateUrl: './generar-inspeccion-vehiculos.component.html',
  styleUrls: ['./generar-inspeccion-vehiculos.component.css'],
})
export class GenerarInspeccionVehiculosComponent {
  activeTab: number = 1;
  file?: File;
  isExcelLoading: boolean = false;
  loading: boolean = false;
  certificadosAGenerar: CertificadoInspeccionVehiculo[] = [];

  constructor(private certificadosService: CertificadosService) {}

  onObtenerCertificados($event: CertificadoInspeccionVehiculo | any) {
    const { registros, file } = $event;
    this.certificadosAGenerar = registros;
    if (!this.certificadosAGenerar.length) {
      return;
    }
    this.file = file;
    this.activeTab = 2;
  }

  async onGenerarCertificados(generarCertificados: boolean) {
    if (!generarCertificados) {
      return;
    }
    if (!this.file) {
      throw 'No se ha seleccionado un archivo';
    }
    try {
      this.loading = true;
      Swal.showLoading();
      const response =
        await this.certificadosService.generarCertificadoInspeccionVehiculos(
          this.file
        );
      if (response) {
        saveAs(
          response,
          `certificados-equipos-${new Date().toLocaleDateString()}`
        );
        Swal.fire({
          title: `${this.certificadosAGenerar.length} ${
            this.certificadosAGenerar.length === 1
              ? 'Certificado'
              : 'Certificados han sido generados con éxito'
          }`,
          confirmButtonColor: '#0d6efd',
          icon: 'success',
        }).then((result) => {
          if (result) {
            window.location.reload();
          }
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        html: error?.error?.message || error?.message || error,
        icon: 'error',
        confirmButtonColor: '#0d6efd',
      }).then((result) => {
        if (result) {
          window.location.reload();
        }
      });
    }
  }
}
