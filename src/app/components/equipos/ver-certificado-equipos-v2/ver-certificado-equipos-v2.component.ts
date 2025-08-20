import { saveAs } from 'file-saver-es';
import { Component, Input, OnInit } from '@angular/core';
import { faClose, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CertificadosService } from 'src/app/services/certificados.service';
import { CertificadoInspeccionEquipoV2 } from 'src/interfaces/Certificado';

@Component({
  selector: 'app-ver-certificado-equipos-v2',
  templateUrl: './ver-certificado-equipos-v2.component.html',
  styleUrls: ['./ver-certificado-equipos-v2.component.css']
})
export class VerCertificadoEquiposV2Component implements OnInit {
  @Input() certificadoEquipo?: CertificadoInspeccionEquipoV2;
  loading: boolean = false;
  close = faClose;
  pdfIcon = faFilePdf;

  constructor(
    private modal: NgbModal,
    private certificadoService: CertificadosService
  ){

  }
  ngOnInit(): void {
  }

  getCodigo(){
    return `EQU-${this.certificadoEquipo?.codigo}-${this.certificadoEquipo?.verificadorCodigo}`;
  }

  onCloseClick(){
    this.modal.dismissAll()
  }

  async descargarCertificadoEquipo(certificadoEquipo: CertificadoInspeccionEquipoV2 ){
    try {
      this.loading = true;
      const respuesta = await this.certificadoService.descargarCertificadoInspeccionEquipoV2(`${certificadoEquipo.codigo}-${certificadoEquipo.verificadorCodigo}`);
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
