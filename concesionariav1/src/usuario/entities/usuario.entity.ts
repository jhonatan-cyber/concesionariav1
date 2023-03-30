import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({versionKey:false})
export class Usuario extends Document {
    @Prop()
    nombre : string;
    @Prop()
    apellido : string;
    @Prop()
    direccion : string;
    @Prop()
    telefono : string;
    @Prop()
    fecha_nacimiento : Date;
    @Prop({
        index: true,
        unique: true,
      })
    usuario : string;
    @Prop({
        index: true,
        unique: true,
      })
    correo : string;
    @Prop()
    password : string;
    @Prop({ default: Date.now() })
    fecha_creacion : Date;
    @Prop({ default: true})
    estado : boolean;
    @Prop()
    url : string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
