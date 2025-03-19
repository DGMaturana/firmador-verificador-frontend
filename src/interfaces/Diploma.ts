export interface Diploma {
    codigo?: number;
    verificadorCodigo?: number;
    registro: string;
    nombre: string;
    rut: string;
    curso: string;
    duracion: number;
    lugar: string;
    fecha: Date;
    firma_1: string;
    firma_2: string;
    hidden?: boolean;
    _id?: string;
}
