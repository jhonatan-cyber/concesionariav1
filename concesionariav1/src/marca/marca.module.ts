import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Marca, MarcaSchema } from './entities/marca.entity';

@Module({
  controllers: [MarcaController],
  providers: [MarcaService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
    {
      name: Marca.name,
      schema: MarcaSchema,
    }
  ])],
  exports: [
    MongooseModule,
  ],
})
export class MarcaModule {}
