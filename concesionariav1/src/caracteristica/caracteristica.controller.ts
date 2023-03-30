import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CaracteristicaService } from './caracteristica.service';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';

@Controller('caracteristica')
export class CaracteristicaController {
  constructor(private readonly caracteristicaService: CaracteristicaService) {}

  @Post()
  create(@Body() createCaracteristicaDto: CreateCaracteristicaDto) {
    return this.caracteristicaService.create(createCaracteristicaDto);
  }

  @Get()
  findAll() {
    return this.caracteristicaService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.caracteristicaService.findOne(term);
  }

  @Patch()
  update(@Body() updateCaracteristicaDto: UpdateCaracteristicaDto) {
    return this.caracteristicaService.update(updateCaracteristicaDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string, @Body() deleteCaracteristicaDto: UpdateCaracteristicaDto) {
    return this.caracteristicaService.remove(id,deleteCaracteristicaDto);
  }
}
