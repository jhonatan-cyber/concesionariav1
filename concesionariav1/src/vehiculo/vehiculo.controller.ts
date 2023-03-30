import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post('/create')
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculoService.create(createVehiculoDto);
  }

  @Get()
  findAll() {
    return this.vehiculoService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.vehiculoService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculoService.update(term, updateVehiculoDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string,  @Body() deleteVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculoService.remove(id,deleteVehiculoDto);
  }
}
