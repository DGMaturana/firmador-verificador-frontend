import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Diploma } from 'src/interfaces/Diploma';

@Component({
  selector: 'app-listar-diplomas-por-generar',
  templateUrl: './listar-diplomas-por-generar.component.html',
  styleUrls: ['./listar-diplomas-por-generar.component.css']
})
export class ListarDiplomasPorGenerarComponent {
 @Input() diplomas: Diploma[] = []; 
 @Input() loading: boolean = false;
 @Output() onGenerarDiplomas: EventEmitter<boolean> = new EventEmitter();

  caretUp   = faCaretUp;
  caretDown = faCaretDown;

  generarDiplomas(){
    this.onGenerarDiplomas.emit(true);
  }
  hideOrShowAll(hide: boolean){
    this.diplomas.forEach(diploma => {
      diploma.hidden = hide;
    })
  }
  toggleHidden(index: number){
    let hidden = this.diplomas[index].hidden 
    this.diplomas[index].hidden = !hidden;
  }

}
