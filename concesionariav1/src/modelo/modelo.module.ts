import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Modelo, ModeloSchema } from './entities/modelo.entity';
import { MarcaModule } from 'src/marca/marca.module';

@Module({
  controllers: [ModeloController],
  providers: [ModeloService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
    {
      name: Modelo.name,
      schema: ModeloSchema,
    }
  ])],
  exports: [MongooseModule],
})
export class ModeloModule {}
