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
      return lastValueFrom(this.http.post<RegistrosResponse>(`${this.apiURL}/api/upload`, formData))
    }


    

   
}

interface RegistrosResponse {
  registros: Registro[];
}

