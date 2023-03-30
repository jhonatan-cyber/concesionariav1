import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createUsuarioDto: CreateUsuarioDto,@UploadedFile() file: Express.Multer.File) {
    return this.usuarioService.create(createUsuarioDto,file);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch()
  update(@Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(updateUsuarioDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() deleteUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.remove(id, deleteUsuarioDto);
  }
}
