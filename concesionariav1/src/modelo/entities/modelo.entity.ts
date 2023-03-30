import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';

@Schema({versionKey:false})
export class Modelo extends Document {
  @Prop({
    index: true,
    unique: true,
  })
  nombre: string;
  @Prop({ default: Date.now() })
  fecha_creacion: Date;
  @Prop({ default: true })
  estado: boolean;
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Caracteristica' }] })
  caracteristica: Caracteristica[];
}

export const ModeloSchema = SchemaFactory.createForClass(Modelo);
