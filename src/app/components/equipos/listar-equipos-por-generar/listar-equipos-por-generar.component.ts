import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { CertificadosService } from 'src/app/services/certificados.service';
import { CertificadoInspeccionVehiculo } from 'src/interfaces/Certificado';

@Component({
  selector: 'app-listar-equipos-por-generar',
  templateUrl: './listar-equipos-por-generar.component.html',
  styleUrls: ['./listar-equipos-por-generar.component.css']
})
export class ListarEquiposPorGenerarComponent {
  @Input() certificados: CertificadoInspeccionVehiculo[] = [];
  @Input() loading: boolean = false;
  @Output() onGenerarCertificados: EventEmitter<boolean> = new EventEmitter();

  constructor( private certificadoService: CertificadosService){
  }
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
