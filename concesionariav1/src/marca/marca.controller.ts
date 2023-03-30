import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcaService.create(createMarcaDto);
  }

  @Get()
  findAll() {
    return this.marcaService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.marcaService.findOne(term);
  }

  @Patch()
  update(@Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcaService.update(updateMarcaDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string, @Body() deleteMarcaDto: UpdateMarcaDto) {
    return this.marcaService.remove(id,deleteMarcaDto);
  }
}
