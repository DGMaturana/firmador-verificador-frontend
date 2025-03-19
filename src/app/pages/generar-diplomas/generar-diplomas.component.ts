import { Component } from '@angular/core';
import { saveAs } from 'file-saver-es';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { Diploma } from 'src/interfaces/Diploma';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-diplomas',
  templateUrl: './generar-diplomas.component.html',
  styleUrls: ['./generar-diplomas.component.css']
})
export class GenerarDiplomasComponent {
  activeTab: number = 1;
  file?: File;
  isExcelLoading: boolean = false;
  loading: boolean = false;
  diplomasPorGenerar: Diploma[] = [];

  constructor(private diplomasService: DiplomasService) {

  }

  onObtenerDiplomas($event:  any) {
    const { diplomas, file } =  $event;
    this.diplomasPorGenerar = diplomas;
    if (!this.diplomasPorGenerar.length) {
      return; 
    }
    this.file = file;
    this.activeTab = 2;
  }

  async generarDiplomas(generarDiplomas: boolean){
    if(!generarDiplomas){
      return;
    }
    try {
      if(!this.file){
        throw "No se ha seleccionado un archivo.";
      }
      this.loading = true;
      const response = await this.diplomasService.generarDiplomas(this.file);
      if (!response){
        throw "Error generando diplomas.";
      }
      saveAs(response, `diplomas-${new Date().toLocaleDateString()}`);
      const diplomasGenerados = this.diplomasPorGenerar.length;
      Swal.fire({
        title: `${diplomasGenerados} ${diplomasGenerados === 1 ? 'diploma' : 'diplomas'} ha${diplomasGenerados ===1 ? "" : "n"} sido generados con éxito`,
        confirmButtonColor: "#0d6efd",
        icon: "success"
      }).then((result) => {
        if (result) {
          window.location.reload();
        }
      });


    } catch (error: any) {
      Swal.fire({
        title: 'Atención',
        html: error?.error?.message || error?.message || error,
        icon: 'warning',
        confirmButtonColor: "#0d6efd",
      }).then((result) => {
        if (result) {
          window.location.reload();
        }
      });
      this.loading = false;
    }
  }

}
