import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretUp, faCaretDown }  from "@fortawesome/free-solid-svg-icons"
import { Certificado } from 'src/interfaces/Certificado';
import { isNumber } from "underscore"
@Component({
  selector: 'app-listar-certificados',
  templateUrl: './listar-certificados.component.html',
  styleUrls: ['./listar-certificados.component.css']
})
export class ListarCertificadosComponent {
  @Input() certificados: Certificado[] = [];
  @Input() loading: boolean = false; 
  @Output() onGenerarCertificados: EventEmitter<boolean> = new EventEmitter();
  
  caretUp   = faCaretUp;
  caretDown = faCaretDown;
  getAsPercentage(percentage: number): string{
    return percentage * 100 + "%"
  }

  getPercentageSenales(percentage: number | string): string{
    if(isNumber(percentage)){
      return percentage * 100 + "%";
    }
    return percentage;
  }

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
