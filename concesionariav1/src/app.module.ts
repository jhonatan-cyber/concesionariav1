import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/env.config';
import { JoinValidationSchema } from './config/joi.validation';
import { ModeloModule } from './modelo/modelo.module';
import { MarcaModule } from './marca/marca.module';
import { CaracteristicaModule } from './caracteristica/caracteristica.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoinValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    ModeloModule,
    MarcaModule,
    CaracteristicaModule,
    VehiculoModule,
    UsuarioModule,
  ],
})
export class AppModule {}
