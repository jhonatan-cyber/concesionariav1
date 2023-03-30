import { Document } from "mongoose";

export interface Marca extends Document{

    nombre: string;
    fecha_creacion: Date;
    estado:boolean;
    
}