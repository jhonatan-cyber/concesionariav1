import { Module } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoController } from './vehiculo.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehiculo, VehiculoSchema } from './entities/vehiculo.entity';
@Module({
  controllers: [VehiculoController],
  providers: [VehiculoService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
    {
      name: Vehiculo.name,
      schema: VehiculoSchema,
    }
  ])],
  exports: [MongooseModule],
})
export class VehiculoModule {}
