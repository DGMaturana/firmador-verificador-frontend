import { Component, EventEmitter, Input } from '@angular/core';
import { faClose, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver-es';
import { CertificadosService } from 'src/app/services/certificados.service';
import { Certificado } from 'src/interfaces/Certificado';

@Component({
  selector: 'app-ver-certificado',
  templateUrl: './ver-certificado.component.html',
  styleUrls: ['./ver-certificado.component.css']
})
export class VerCertificadoComponent {
  @Input() certificado?: Certificado;

  loading: boolean = false;
  close = faClose;
  pdfIcon = faFilePdf;
  onClose = new EventEmitter();

  constructor(private modal: NgbModal, private certificadoService: CertificadosService){

  }

  getCodigo(){
    return this.certificado?.codigo + "-" + this.certificado?.verificadorCodigo;
  }
 async descargarCertificado(certificado: Certificado){
  try {
    this.loading= true;
    const respuesta = await this.certificadoService.descargarCertificado(`${certificado.codigo}-${certificado.verificadorCodigo}`);
    if(respuesta){
      saveAs(respuesta, `${certificado.codigo}-${certificado.verificadorCodigo}.pdf`)
      this.loading = false;
    }
  } catch (error) {
    this.loading = false;
  }
  }
  onCloseClick(){
    this.modal.dismissAll()
  }
}
