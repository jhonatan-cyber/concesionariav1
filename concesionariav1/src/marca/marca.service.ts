import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';

@Injectable()
export class MarcaService {

  constructor(
    @InjectModel(Marca.name)
    private readonly marcaModel: Model<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto) {
    createMarcaDto.nombre = createMarcaDto.nombre.toLowerCase();
    try {
      const marca = await this.marcaModel.create(createMarcaDto);
      return marca;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.marcaModel.find()
    .select('-__v');
  }

  async findOne(term: string) {
    let marca: Marca;
    if (!isNaN(+term)) {
      marca = await this.marcaModel.findOne({ nro: term });
    }
    //MongoID
    if (!marca && isValidObjectId(term)) {
      marca = await this.marcaModel.findById(term);
    }
    //Name
    if (!marca) {
      marca = await this.marcaModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }
    if (!marca) {
      throw new NotFoundException(
        `Marca with id, name or no "${term}" not found`,
      );
    }
    return marca;
  }

  async update(updateMarcaDto: UpdateMarcaDto) {
    const marca = await this.findOne(updateMarcaDto._id);
    if (updateMarcaDto.nombre) {
      updateMarcaDto.nombre = updateMarcaDto.nombre.toLocaleLowerCase();
    }
    try {
      await marca.updateOne(updateMarcaDto);
      return { ...marca.toJSON(), ...updateMarcaDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string,deleteMarcaDto:UpdateMarcaDto) {
    const marca = await this.findOne(id);
    try {
      deleteMarcaDto.estado=false;
      await marca.updateOne(deleteMarcaDto);
      return { ...marca.toJSON(), ...deleteMarcaDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  
  private handleExceptions(error:any){
    if (error.code == 11000) {
      throw new BadRequestException(
        `Marca exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Marca - Check server logs`,
    );
  }
}
