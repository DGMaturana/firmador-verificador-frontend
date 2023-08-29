import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { lastValueFrom } from 'rxjs';
import { Registro } from '../components/registros/Registro';
@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  private apiURL: string = enviroment.apiURL;


  constructor(private http: HttpClient) {
  }

    async obtenerRegistros(archivo: any){
      const formData = new FormData();
      formData.append('sheet', archivo);
      console.log(...formData.getAll('sheet'));
      return lastValueFrom(this.http.post<RegistrosResponse>(`${this.apiURL}/api/upload`, formData))
    }

    async firmarRegistros(registros: Registro[]){
      const formData = new FormData();
      formData.append('registros', JSON.stringify(registros) )
    
      const certificados = registros.map(registro => registro.certificado);

      for (const certificado of certificados ){
        formData.append('files', certificado)
      } 
    

      return lastValueFrom(this.http.post<FirmaResponse>(`${this.apiURL}/api/registros`, formData));
    

    }

    descargarPDF(certificado: string){
      return this.http.get(`${this.apiURL}/api/registros/${certificado}`, { responseType: 'blob'})
    }


    

   
}

interface RegistrosResponse {
  registros: Registro[];
}

interface FirmaResponse {
  done      : boolean;
  registros : Registro[];
}

