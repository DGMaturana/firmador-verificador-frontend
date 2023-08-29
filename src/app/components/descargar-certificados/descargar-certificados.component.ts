import { Component, Input } from '@angular/core';
import { Registro } from '../registros/Registro';
import { RegistrosService } from 'src/app/services/registros.service';
import { saveAs } from "file-saver"

@Component({
  selector: 'app-descargar-certificados',
  templateUrl: './descargar-certificados.component.html',
  styleUrls: ['./descargar-certificados.component.css']
})
export class DescargarCertificadosComponent {
  @Input() registros?: Registro[];


  constructor( private registrosService: RegistrosService){

  }
   async onDownloadClick(certificado: string){
     this.registrosService.descargarPDF(certificado).subscribe(
      resp => {
        saveAs(resp, certificado)
      }
     )
    
    
   }

}
