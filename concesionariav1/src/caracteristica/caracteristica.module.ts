import { Module } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CaracteristicaController } from './caracteristica.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Caracteristica, CaracteristicaSchema } from './entities/caracteristica.entity';

@Module({
  controllers: [CaracteristicaController],
  providers: [CaracteristicaService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
    {
      name: Caracteristica.name,
      schema: CaracteristicaSchema,
    }
  ])],
  exports: [MongooseModule],
})
export class CaracteristicaModule {}
