import { Component } from '@angular/core';
import { CertificadoInspeccionVehiculo } from 'src/interfaces/Certificado';

@Component({
  selector: 'app-generar-inspeccion-vehiculos',
  templateUrl: './generar-inspeccion-vehiculos.component.html',
  styleUrls: ['./generar-inspeccion-vehiculos.component.css']
})
export class GenerarInspeccionVehiculosComponent {
  activeTab: number = 1;
  isExcelLoading: boolean = false;
  loading: boolean = false;
  certificadosAGenerar: CertificadoInspeccionVehiculo[] = [];

  onObtenerCertificados($event: CertificadoInspeccionVehiculo | any) {
    this.certificadosAGenerar = $event;
    console.log(this.certificadosAGenerar);
  }
}
