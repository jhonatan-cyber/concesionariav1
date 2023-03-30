import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';
import { Caracteristica } from './entities/caracteristica.entity';

@Injectable()
export class CaracteristicaService {

  constructor(
    @InjectModel(Caracteristica.name)
    private readonly caracteristicaModel: Model<Caracteristica>,
  ) {}

  async create(createCaracteristicaDto: CreateCaracteristicaDto) {
    createCaracteristicaDto.nombre = createCaracteristicaDto.nombre.toLowerCase();
    try {
      const caracteristica = await this.caracteristicaModel.create(createCaracteristicaDto);
      return caracteristica;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return this.caracteristicaModel.find()
    .select('-__v');
  }

  async findOne(term: string) {
    let caracteristica: Caracteristica;
    if (!isNaN(+term)) {
      caracteristica = await this.caracteristicaModel.findOne({ nro: term });
    }
    //MongoID
    if (!caracteristica && isValidObjectId(term)) {
      caracteristica = await this.caracteristicaModel.findById(term);
    }
    //Name
    if (!caracteristica) {
      caracteristica = await this.caracteristicaModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }
    if (!caracteristica) {
      throw new NotFoundException(
        `Caracteristica with id, name or no "${term}" not found`,
      );
    }
    return caracteristica;
  }

  async update(updateCaracteristicaDto: UpdateCaracteristicaDto) {
    const caracteristica = await this.findOne(updateCaracteristicaDto._id);
    if (updateCaracteristicaDto.nombre) {
      updateCaracteristicaDto.nombre = updateCaracteristicaDto.nombre.toLocaleLowerCase();
    }
    try {
      await caracteristica.updateOne(updateCaracteristicaDto);
      return { ...caracteristica.toJSON(), ...updateCaracteristicaDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string,deleteCaracteristicaDto:UpdateCaracteristicaDto) {
    const caracteristica = await this.findOne(id);
    try {
      deleteCaracteristicaDto.estado=false;
      await caracteristica.updateOne(deleteCaracteristicaDto);
      return { ...caracteristica.toJSON(), ...deleteCaracteristicaDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  
  private handleExceptions(error:any){
    if (error.code == 11000) {
      throw new BadRequestException(
        `Modelo exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Modelo - Check server logs`,
    );
  }
}
