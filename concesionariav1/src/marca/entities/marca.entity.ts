import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({versionKey:false})
export class Marca extends Document {
  @Prop({
    index: true,
    unique: true,
  })
  nombre: string;
  @Prop({ default: Date.now() })
  fecha_creacion: Date;
  @Prop({ default: true })
  estado: boolean;
}

export const MarcaSchema = SchemaFactory.createForClass(Marca);
