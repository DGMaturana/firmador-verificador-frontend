import { Component, Input } from '@angular/core';
import { CertificadoInspeccionVehiculo } from 'src/interfaces/Certificado';
import { faClose, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CertificadosService } from 'src/app/services/certificados.service';
import { saveAs } from 'file-saver-es';

@Component({
  selector: 'app-verificar-certificado-equipo',
  templateUrl: './verificar-certificado-equipo.component.html',
  styleUrls: ['./verificar-certificado-equipo.component.css']
})
export class VerificarCertificadoEquipoComponent {
  @Input() certificadoEquipo?: CertificadoInspeccionVehiculo;
  loading: boolean = false;
    close = faClose;
    pdfIcon = faFilePdf;

    constructor(
      private modal: NgbModal,
      private certificadoService: CertificadosService
    ){

    }
    getCodigo(){
      return `EQU-${this.certificadoEquipo?.codigo}-${this.certificadoEquipo?.verificadorCodigo}`;
    }

    onCloseClick(){
      this.modal.dismissAll()
    }

    async descargarCertificadoEquipo(certificadoEquipo: CertificadoInspeccionVehiculo ){
      try {
        this.loading = true;
        const respuesta = await this.certificadoService.descargarCertificadoInspeccionEquipo(`${certificadoEquipo.codigo}-${certificadoEquipo.verificadorCodigo}`);
        if (! respuesta ){
          this.loading = false;
          return;
        }
        saveAs(respuesta, `${certificadoEquipo.codigo}-${certificadoEquipo.verificadorCodigo}.pdf`);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
}
