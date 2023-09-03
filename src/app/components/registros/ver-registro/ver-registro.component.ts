import { Component, EventEmitter, Input } from '@angular/core';
import { Registro } from '../Registro';
import { faClose }  from "@fortawesome/free-solid-svg-icons"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ver-registro',
  templateUrl: './ver-registro.component.html',
  styleUrls: ['./ver-registro.component.css']
})
export class VerRegistroComponent {
  @Input() registro?: Registro;

  constructor(private modal: NgbModal){

  }

  close = faClose;
  onClose = new EventEmitter();
  
  onCloseClick(){
    this.modal.dismissAll()
  }


}
