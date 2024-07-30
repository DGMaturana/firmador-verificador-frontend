export interface Certificado {
    registroCertificado: string,
    nombre: string,
    rut: string,
    empresa: string,
    formato: Formato,
    equipoCargo: string,
    capacidad: string,
    resultadoEvaluacion: string,
    fechaCapacitacion: Date,
    fechaCertificacion: Date,
    fechaExpiracion: Date,
    porcentajeTeorico: number,
    porcentajePractico: number,
    porcentajeSenales: number,
    notaFinal: string,
    verificadorCodigo: number;
    clase: string,
    municipalidad: string,
    ley: string,
    codigo: string,
    fechaControl?: Date,
    restricciones: string
    hidden?: boolean;
}

export type Formato = "FC_CER" | "CR_CAP" | "CR_CER" | "JC_CAP" ;
