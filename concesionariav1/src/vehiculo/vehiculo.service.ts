import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Vehiculo } from './entities/vehiculo.entity';

@Injectable()
export class VehiculoService {

  constructor(
    @InjectModel(Vehiculo.name)
    private readonly vehiculoModel: Model<Vehiculo>,
  ) {}

  async create(createVehiculoDto: CreateVehiculoDto) {
    createVehiculoDto.nombre = createVehiculoDto.nombre.toLowerCase();
    try {
      console.log(createVehiculoDto)
      const vehiculo = await this.vehiculoModel.create(createVehiculoDto);
      console.log(vehiculo)
      return vehiculo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.vehiculoModel.find()
    .populate('modelo','marca')
  }

  async findOne(term: string) {
    let vehiculo: Vehiculo;
    if (!isNaN(+term)) {
      vehiculo = await this.vehiculoModel.findOne({ nro: term }).populate('modelo','marca');
    }
    //MongoID
    if (!vehiculo && isValidObjectId(term)) {
      vehiculo = await this.vehiculoModel.findById(term).populate('modelo','marca');
    }
    //Name
    if (!vehiculo) {
      vehiculo = await this.vehiculoModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      }).populate('modelo','marca');
    }
    if (!vehiculo) {
      throw new NotFoundException(
        `Car with id, name or no "${term}" not found`,
      );
    }
    return vehiculo;
  }

  async update(term: string, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = await this.findOne(term);
    if (updateVehiculoDto.nombre) {
      updateVehiculoDto.nombre = updateVehiculoDto.nombre.toLocaleLowerCase();
    }
    try {
      await vehiculo.updateOne(updateVehiculoDto);
      return { ...vehiculo.toJSON(), ...updateVehiculoDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string,deleteVehiculoDto:UpdateVehiculoDto) {
    const vehiculo = await this.findOne(id);
    try {
      deleteVehiculoDto.estado=false;
      await vehiculo.updateOne(deleteVehiculoDto);
      return { ...vehiculo.toJSON(), ...deleteVehiculoDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error:any){
    if (error.code == 11000) {
      throw new BadRequestException(
        `Vehiculo exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Vehiculo - Check server logs`,
    );
  }
}
