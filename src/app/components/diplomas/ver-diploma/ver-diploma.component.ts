import { Component, Input } from '@angular/core';
import { faClose, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver-es';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { Diploma } from 'src/interfaces/Diploma';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-diploma',
  templateUrl: './ver-diploma.component.html',
  styleUrls: ['./ver-diploma.component.css']
})
export class VerDiplomaComponent {
  @Input() diploma: Diploma | null = null;
  constructor(
    private modal: NgbModal,
    private diplomasService: DiplomasService
  ) { }
  loading: boolean = false;
  
  close = faClose;
  pdfIcon = faFilePdf;

  getCodigo() {
    return this.diploma?.codigo + "-" + this.diploma?.verificadorCodigo;
  }

  onCloseClick(){
    this.modal.dismissAll()
  }

  async descargarDiploma(diploma: Diploma){
    try {
      this.loading = true;
      const respuesta = await this.diplomasService.descargarDiploma(diploma._id!);
      if (!respuesta){
        throw new Error("No se pudo descargar el diploma")
      }
      saveAs(respuesta, `${diploma.codigo}-${diploma.verificadorCodigo}.pdf`)
      this.loading = false;
      
    } catch (error: any) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: error?.message ||  "No se pudo descargar el diploma"
      })
    }
  }

}
