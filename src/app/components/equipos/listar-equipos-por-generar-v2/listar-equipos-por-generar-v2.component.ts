import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { CertificadoInspeccionEquipoV2 } from 'src/interfaces/Certificado';

@Component({
  selector: 'app-listar-equipos-por-generar-v2',
  templateUrl: './listar-equipos-por-generar-v2.component.html',
  styleUrls: ['./listar-equipos-por-generar-v2.component.css']
})
export class ListarEquiposPorGenerarV2Component {
  @Input() certificados: CertificadoInspeccionEquipoV2[] = [];
  @Input() loading: boolean = false;
  @Output() onGenerarCertificados: EventEmitter<boolean> = new EventEmitter();
  caretUp   = faCaretUp;
  caretDown = faCaretDown;
  toggleHidden(index: number){
    let hidden = this.certificados[index].hidden 
    if(!hidden){
      this.certificados[index].hidden = true;
      return;
    }
    this.certificados[index].hidden = false;
  }

  hideOrShowAll(hide: boolean){
    this.certificados.forEach(certificado => {
      certificado.hidden = hide;
    })
  }

  generarCertificados(){
    this.onGenerarCertificados.emit(true);
  }
}
