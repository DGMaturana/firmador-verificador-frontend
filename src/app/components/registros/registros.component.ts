import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Registro } from './Registro';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent {
  @Input() registros?: Registro[]
  @Input() formularioRegistros?: FormGroup;
  @Output() onFileChangeEvent = new EventEmitter()

  constructor(){
    
  }

  onFileChange(registro: any, index: number){
    const registroConCertificado = {
      registro,
      index
    }
    this.onFileChangeEvent.emit(registroConCertificado);
  }

}
