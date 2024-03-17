import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver-es';
import { CertificadosService } from 'src/app/services/certificados.service';
import { Certificado } from 'src/interfaces/Certificado';
import Swal from 'sweetalert2';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-generar-certificados',
  templateUrl: './generar-certificados.component.html',
  styleUrls: ['./generar-certificados.component.css']
})
export class GenerarCertificadosComponent {

  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );

 isExcelLoading: boolean = false;
 activeTab: number = 1;
 certificadosAGenerar: Certificado[] = [];
 file?: File;
 loading: boolean = false;

 constructor( private certificadoService: CertificadosService,
              private router: Router ){

 }

 onObtenerCertificados(onObtenerCertificados: { certificados: Certificado[], file: File}){
  const { certificados, file } = onObtenerCertificados;
  console.log("=================================")
  console.log(" onObtenerCertificados !")
  console.log("=================================")
  this.activeTab = 2;
  this.certificadosAGenerar = certificados;
  this.file = file;
  console.log({certificados});
 }

 async generarCertificados(generarCertificados: boolean){
    if(generarCertificados){

        try {
          if (this.file) {
            this.loading = true;
            const response = await this.certificadoService.generarCertificados(
              this.file
            );
    
            if(response && response.done){
              throw "Error generando certificados."

            }
            if (response) {
              saveAs(response, `certificados-${new Date().toLocaleDateString()}`);
              Swal.fire({
                title: `${this.certificadosAGenerar.length} ${this.certificadosAGenerar.length===1 ? 'Certificado' : 'Certificados han sido generados con éxito'}`,
                confirmButtonColor: "#0d6efd",
                icon: "success"  }).then((result ) => {
                  if(result){
                    window.location.reload();
                  }
                })
            } else {
              throw "Error generando certificados."
            }
            // Swal.fire(, "", "success")
            this.loading = false;
    
            console.log(response);
           
          }
        } catch (error: any) {
          console.log({ error });
          Swal.fire({
            title: 'Atención',
            html: error?.message || error?.error?.message || error,
            icon: 'warning',
            confirmButtonColor: "#0d6efd",
          }).then((result) => {
            if (result) {
              window.location.reload();
            }
          });


        }
      
    }
 }
}
