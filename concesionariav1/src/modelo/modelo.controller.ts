import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('modelo')
export class ModeloController {
  constructor(private readonly modeloService: ModeloService) {}

  @Post()
  create(@Body() createModeloDto: CreateModeloDto) {
    console.log(createModeloDto)
    return this.modeloService.create(createModeloDto);
  }

  @Get()
  findAll() {
    return this.modeloService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.modeloService.findOne(term);
  }

  @Patch()
  update(@Body() updateModeloDto: UpdateModeloDto) {
    return this.modeloService.update(updateModeloDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string, @Body() deleteModeloDto: UpdateModeloDto) {
    return this.modeloService.remove(id,deleteModeloDto);
  }
}
