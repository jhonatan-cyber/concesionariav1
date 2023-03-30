import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Marca } from 'src/marca/entities/marca.entity';
import { Modelo } from 'src/modelo/entities/modelo.entity';

@Schema({versionKey:false})
export class Vehiculo extends Document{
      @Prop({
        index: true,
      })
      nombre: string;
      @Prop({
        index: true,
      })
      precio: number;
      @Prop({
        index: true,
      })
      stock: number;
      @Prop({ default: Date.now() })
      fecha_creacion: Date;
      @Prop({ default: true })
      estado: boolean;
      @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Marca' }] })
      marca: Marca;
      @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Modelo' }] })
      modelo: Modelo;
}
export const VehiculoSchema = SchemaFactory.createForClass(Vehiculo);