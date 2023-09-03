export interface Registro {
  nombre: string;
  rut: string;
  empresa: string;
  equipoCargo: string;
  resultadoEvaluacion: string;
  fechaCertificacion: Date | null; 
  fechaExpiracion: Date | null;
  notaFinal: string;
  codigo: string;
  certificado: any;
}