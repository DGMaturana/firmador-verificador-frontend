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

export interface CertificadoInspeccionVehiculo {
    numeroCertificado: string;
    numeroInformeAsociado: string;
    empresaSolicitante: string;
    tipoInspeccion: string;
    producto: string;
    lugarInspeccion: string;
    formato: Formato;
    tipoEquipo: string;
    marcaEquipo: string;
    modeloEquipo: string;
    marcaPluma: string;
    modeloPluma: string;
    marcaProducto: string;
    modeloProducto: string;
    numeroSerie: string;
    numeroMotorEquipo: string;
    numeroChasisEquipo: string;
    numeroInternoEquipo: string;
    placaPatente: string;
    anoFabricacion: string;
    resultado: | "APROBADO" | "RECHAZADO";
    fechaInspeccion: Date;
    fechaEmisionCertificado: Date;
    fechaVencimientoCertificado: Date;
    hidden?: boolean;
    codigo?: string;
    verificadorCodigo?: number;

}

export interface CertificadoInspeccionEquipoV2 {
    codigo?: number;
    verificadorCodigo?: number;
    numeroCertificado: string;
    numeroInformeAsociado: string;
    tipoInspeccion: string;
    tipoEquipo: string;
    empresaSolicitante: string;
    lugarInspeccion: string;
    formato: FormatoInspeccionVehicularV2;
    equipoInspeccionado: string;
    capacidadEquipo: string;
    numeroSerieEquipo: string;
    numeroMotorEquipo: string;
    numeroInternoEquipo: string;
    placaPatenteEquipo: string;
    anoFabricacion: string;
    resultado: "APROBADO" | "RECHAZADO";
    fechaInspeccion: Date;
    fechaEmisionCertificado: Date;
    fechaVencimientoCertificado: Date;
    hidden?: boolean;
}

export enum Formato {
    FelixConchaCertificacion = "FC_CER", 
    CarlosRamosCapacitacion  = "CR_CAP", 
    CarlosRamosCertificacion = "CR_CER", 
    JuanCarlosCapacitacion   = "JC_CAP",
    CarlosRamosInspeccion    = "CR_INS",
    FelipeRamosInspeccion    = "FR_INS",
    PedroRiveraInspeccion    = "PR_INS",
    AMInspeccion             = "AM_INS", 
}


export enum FormatoInspeccionVehicularV2 {
    CarlosRamosISI = "CR_ISI",
    PedroRiveraISI = "PR_ISI",
    GabrielOrtegaISI = "GO_ISI"
}
