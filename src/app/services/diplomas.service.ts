import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Diploma } from 'src/interfaces/Diploma';
import { read, utils } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DiplomasService {
  private apiURL: string = enviroment.apiURL;
  private http = inject(HttpClient);
  
  constructor() { }

  public async leerDiplomas(archivo: File): Promise<{ diplomas: Diploma[] }> {
    try {
      const resultadoLectura = await this.leerArchivoComoArrayBuffer(archivo);
      if (!resultadoLectura) {
        throw new Error('No se pudo leer el archivo');
      }
      var data = new Uint8Array( resultadoLectura );
      const workbook = read(data, { type: 'array', cellDates: true });
      const wsNames = workbook.SheetNames;
      const hojaDiplomas = workbook.Sheets[wsNames[0]];
      var range = utils.decode_range(hojaDiplomas['!ref']!);
      range.s.r = 1; // <-- zero-indexed, so setting to 1 will skip row 0
      hojaDiplomas['!ref'] = utils.encode_range(range);
      const headers = [
        "registro",
        "nombre",
        "rut",
        "curso",
        "duracion",
        "lugar",
        "fecha",
        "firma_1",
        "firma_2",
      ]

      const diplomas = utils.sheet_to_json(hojaDiplomas, { header: headers }) as Diploma[];
      return {
        diplomas: diplomas
      }; 
      
    } catch (error) {
      return {
        diplomas: []
      }
    }
  }

  private leerArchivoComoArrayBuffer(archivo: File): Promise<ArrayBuffer> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reject(Error('Problema leyendo archivo'));
      };
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      reader.readAsArrayBuffer(archivo);
  })
  }

  async generarDiplomas(file: File): Promise<Blob> {
       const formData = new FormData();
        formData.append('sheet', file);
        return lastValueFrom(
          this.http.post(
            `${this.apiURL}/api/diplomas/generar-diplomas`,
            formData,
            { responseType: 'blob' }
          )
        );
  }

  async verificarDiploma(codigo: string ){
    return lastValueFrom( this.http.post<VerificarDiplomaResponse>(`${this.apiURL}/api/diplomas/verificar-diploma`, { codigo }));
  }

  async descargarDiploma( id: string){
    return lastValueFrom( this.http.get(`${this.apiURL}/api/diplomas/descargar-diploma/${id}`, { responseType: 'blob' }));
  }
}

interface VerificarDiplomaResponse {
  done: boolean;
  diploma: Diploma;
  message?: string;
}