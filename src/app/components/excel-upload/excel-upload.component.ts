import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent {
  @Input() form?: FormGroup;
  @Input() estanCargadosRegistros?: boolean;
  @Output() onObtenerRegistros = new EventEmitter();
  allowedExtensions: string[] = ['xls','xlsx'];
  constructor(private registroService: RegistrosService){

  }

  async obtenerRegistros(event: any){
    try{
      console.log('hola!')
      if(event.target.files && event.target.files.length){
        const file = event.target?.files[0];
      
        const { registros } = await this.registroService.obtenerRegistros(file)
        if(registros){
          this.onObtenerRegistros.emit(registros)
        }
        console.log(registros)

      }

    }catch(error){
      throw error;
    }
    // this.registroService.obtenerRegistros()
  }




}
