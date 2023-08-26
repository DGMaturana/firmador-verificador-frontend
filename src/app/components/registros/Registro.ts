export interface Registro {
    NOMBRE: string;
    RUT: string;
    EMPRESA: string;
    EQUIPO_O_CARGO: string;
    RESULTADO_EVALUACION: string;
    FECHA_CERTIFICACION: Date | null; 
    FECHA_EXPIRACION: Date | null;
    NOTA_FINAL: string;
    CODIGO: string;
  }