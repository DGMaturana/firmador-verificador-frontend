import { Component, Input } from '@angular/core';
import { Registro } from './Registro';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent {
  @Input() registros?: Registro[]

  constructor(){
    
  }

}
