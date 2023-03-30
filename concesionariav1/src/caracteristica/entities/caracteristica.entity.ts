import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({versionKey:false})
export class Caracteristica extends Document {
  @Prop({
    index: true,
    unique: true,
  })
  nombre: string;
  @Prop()
  descripcion: string;
  @Prop({ default: Date.now() })
  fecha_creacion: Date;
  @Prop({ default: true })
  estadoo: boolean;
}
export const CaracteristicaSchema =
  SchemaFactory.createForClass(Caracteristica);
