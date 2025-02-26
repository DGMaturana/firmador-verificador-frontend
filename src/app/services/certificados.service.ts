import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Certificado, CertificadoInspeccionVehiculo } from 'src/interfaces/Certificado';
import { read, utils } from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class CertificadosService {
  private apiURL: string = enviroment.apiURL;
  private http = inject(HttpClient);
  constructor() {}

  async descargarCertificado(codigo: string){
    return lastValueFrom(this.http.get(`${this.apiURL}/api/certificados/descargar/${codigo}`, {responseType: 'blob'}))
  }

  async verificarCertificado(codigo: string){
    return lastValueFrom(this.http.get<VerificarResponse>(`${this.apiURL}/api/certificados/verificar/${codigo}`))
    
  }

  generarCertificados(archivo: File): Promise<Blob | any> {
    const formData = new FormData();
    formData.append('sheet', archivo);
    return lastValueFrom(
      this.http.post(
        `${this.apiURL}/api/upload/generar-certificados`,
        formData,
        { responseType: 'blob' }
      )
    );
  }

  async leerCertificados(archivo: File) {
    try {

      const resultadoLectura = await this.leerArchivoSubidoComoArray(archivo);

      var data = new Uint8Array(resultadoLectura as ArrayBuffer);
      const workbook = read(data, { type: 'array', cellDates: true });
      const wsNames = workbook.SheetNames;
      const hojaRegistros = workbook.Sheets[wsNames[0]];
      var range = utils.decode_range(hojaRegistros['!ref']!);
      range.s.r = 1; // <-- zero-indexed, so setting to 1 will skip row 0
      hojaRegistros['!ref'] = utils.encode_range(range);
      const headers = [
        'registroCertificado',
        'nombre',
        'rut',
        'empresa',
        'formato',
        'equipoCargo',
        'capacidad',
        'resultadoEvaluacion',
        'fechaCapacitacion',
        'fechaCertificacion',
        'fechaExpiracion',
        'porcentajeTeorico',
        'porcentajePractico',
        'porcentajeSenales',
        'notaFinal',
        'clase',
        'municipalidad',
        'ley',
        'fechaControl',
        'restricciones',
      ];
      const hoja = utils.sheet_to_json(hojaRegistros, {
        header: headers,
      }) as Certificado[];
      return hoja;
    } catch (error) {
      return null;
    }
  }

  leerArchivoSubidoComoArray(archivo: File) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reject(Error('Problema leyendo archivo'));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(archivo);
    });
  }

  async leerInspeccionVehiculos(archivo: File) {
    try {
      const resultadoLectura = await this.leerArchivoSubidoComoArray(archivo);

      const data = new Uint8Array(resultadoLectura as ArrayBuffer);
      const workbook = read(data, { type: 'array', cellDates: true });
      const wsNames = workbook.SheetNames;
      const hojaRegistros = workbook.Sheets[wsNames[0]];
      const range = utils.decode_range(hojaRegistros['!ref']!);
      range.s.r = 1; // <-- zero-indexed, so setting to 1 will skip row 0
      hojaRegistros['!ref'] = utils.encode_range(range);
    const headers = [
        "numeroCertificado",
        "numeroInformeAsociado",
        "empresaSolicitante",
        "tipoInspeccion",
        "producto",
        "lugarInspeccion",
        "formato",
        "tipoEquipo",
        "marcaEquipo",
        "modeloEquipo",
        "marcaPluma",
        "modeloPluma",
        "marcaProducto",
        "modeloProducto",
        "numeroSerie",
        "numeroMotorEquipo",
        "numeroChasisEquipo",
        "numeroInternoEquipo",
        "placaPatente",
        "anoFabricacion",
        "resultado",
        "fechaInspeccion",
        "fechaEmisionCertificado",
        "fechaVencimientoCertificado"
    ]
    const hoja = utils.sheet_to_json(hojaRegistros, {
      header: headers,
    }) as CertificadoInspeccionVehiculo[];

    return {
      registros: hoja,
    };
    } catch (error) {
      throw error;
    }
  }

  async generarCertificadoInspeccionVehiculos( archivo: File ): Promise<Blob | any>{
    const formData = new FormData();
    formData.append('sheet', archivo);
    return lastValueFrom(this.http.post(`${this.apiURL}/api/certificados/generar-certificados-inspeccion-vehiculos`, formData, {responseType: 'blob'}))
  }

  async veritificarCertificadoInspeccionVehiculos(codigo: string){
    return lastValueFrom(this.http.get<any>(`${this.apiURL}/api/certificados/verificar-inspeccion-vehiculo/${codigo}`))
  }

  async descargarCertificadoInspeccionEquipo(codigo: string){
    return lastValueFrom(this.http.get(`${this.apiURL}/api/certificados/descargar-inspeccion-equipo/${codigo}`, {responseType: 'blob'}))
  }
}

interface VerificarResponse extends ApiResponse{ 
  certificado: Certificado;
  done: boolean;
}

interface ApiResponse {
  done: boolean; 
  error?: string;
}