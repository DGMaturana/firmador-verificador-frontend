import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { lastValueFrom } from 'rxjs';
import { Registro } from '../components/registros/Registro';
@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  private apiURL: string = enviroment.apiURL;
  private http = inject( HttpClient );


  constructor() {
  }
    async obtenerRegistros(archivo: any){
      const formData = new FormData();
      formData.append('sheet', archivo);
      return lastValueFrom(this.http.post<RegistrosResponse>(`${this.apiURL}/api/upload`, formData))
    }

    async firmarRegistros(registros: Registro[]){
      const token = localStorage.getItem('token');
      if(!token) {
        return;
      }
      const formData = new FormData();

      formData.append('registros', JSON.stringify(registros) )

      const headers = new HttpHeaders().set('Authorization', token)

      const certificados = registros.map(registro => registro.certificado);

      for (const certificado of certificados ){
        formData.append('files', certificado)
      } 
    
      return lastValueFrom(this.http.post<FirmaResponse>(`${this.apiURL}/api/registros`,  formData,  {headers}));
    

    }

    descargarPDF(certificado: string){
      return this.http.get(`${this.apiURL}/api/registros/${certificado}`, { responseType: 'blob'})
    }

    verificarRegistro(codigo: string){
      return lastValueFrom(this.http.get<VerificarResponse>(`${this.apiURL}/api/registros/verificar/${codigo}`))
    }

    
   
}


interface RegistrosResponse extends ApiResponse {
  registros: Registro[];
}

interface FirmaResponse extends ApiResponse {
  registros : Registro[];
}

interface VerificarResponse extends ApiResponse{ 
  registro: Registro;
}

interface ApiResponse {
  done: boolean; 
  error?: string;
}