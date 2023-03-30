
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { Modelo } from './entities/modelo.entity';

@Injectable()
export class ModeloService {

  constructor(
    @InjectModel(Modelo.name)
    private readonly modeloModel: Model<Modelo>,
  ) {}

  async create(createModeloDto: CreateModeloDto) {
    createModeloDto.nombre = createModeloDto.nombre.toLowerCase();
    try {
      console.log(createModeloDto)
      const modelo = await this.modeloModel.create(createModeloDto);
      console.log(modelo)
      return modelo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.modeloModel.find()
    .populate('caracteristica')
  }

  async findOne(term: string) {
    let modelo: Modelo;
    if (!isNaN(+term)) {
      modelo = await this.modeloModel.findOne({ nro: term }).populate('caracteristica');
    }
    //MongoID
    if (!modelo && isValidObjectId(term)) {
      modelo = await this.modeloModel.findById(term).populate('caracteristica');
    }
    //Name
    if (!modelo) {
      modelo = await this.modeloModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      }).populate('caracteristica');
    }
    if (!modelo) {
      throw new NotFoundException(
        `Modelo with id, name or no "${term}" not found`,
      );
    }
    return modelo;
  }

  async update(updateModeloDto: UpdateModeloDto) {
    const modelo = await this.findOne(updateModeloDto._id);
    if (updateModeloDto.nombre) {
      updateModeloDto.nombre = updateModeloDto.nombre.toLocaleLowerCase();
    }
    try {
      await modelo.updateOne(updateModeloDto);
      return { ...modelo.toJSON(), ...updateModeloDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string,deleteModeloDto:UpdateModeloDto) {
    const modelo = await this.findOne(id);
    try {
      deleteModeloDto.estado=false;
      await modelo.updateOne(deleteModeloDto);
      return { ...modelo.toJSON(), ...deleteModeloDto };
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
