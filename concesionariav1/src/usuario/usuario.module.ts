import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
    {
      name: Usuario.name,
      schema: UsuarioSchema,
    }
  ])],
  exports: [
    MongooseModule,
  ],
})
export class UsuarioModule {}
