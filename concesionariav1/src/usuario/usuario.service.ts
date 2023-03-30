import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { Readable } from 'stream';
// import toStream = require('buffer-to-stream');

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  async image(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    cloudinary.config({
          cloud_name: 'dh4stvtb2',
          api_key: '588695437793265',
          api_secret: 'zjq2VDOdPdyn-72MRhpC4uZZe7s',
        });
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      // toStream(file.buffer).pipe(upload);
      Readable.from(file.buffer).pipe(upload);
    });
  }

  async create(createUsuarioDto: CreateUsuarioDto, file: Express.Multer.File) {
    const url = await this.image(file);
    createUsuarioDto.url = url.secure_url;
    createUsuarioDto.nombre = createUsuarioDto.nombre.toLowerCase();
    try {
      const usuario = await this.usuarioModel.create(createUsuarioDto);
      return usuario;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.usuarioModel.find().select('-__v');
  }

  async findOne(term: string) {
    let usuario: Usuario;
    if (!isNaN(+term)) {
      usuario = await this.usuarioModel.findOne({ nro: term });
    }
    //MongoID
    if (!usuario && isValidObjectId(term)) {
      usuario = await this.usuarioModel.findById(term);
    }
    //Name
    if (!usuario) {
      usuario = await this.usuarioModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }
    if (!usuario) {
      throw new NotFoundException(
        `Usuario with id, name or no "${term}" not found`,
      );
    }
    return usuario;
  }

  async update(updateUsuarioDto: UpdateUsuarioDto) {
    const marca = await this.findOne(updateUsuarioDto._id);
    if (updateUsuarioDto.nombre) {
      updateUsuarioDto.nombre = updateUsuarioDto.nombre.toLocaleLowerCase();
    }
    try {
      await marca.updateOne(updateUsuarioDto);
      return { ...marca.toJSON(), ...updateUsuarioDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string, deleteUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    try {
      deleteUsuarioDto.estado = false;
      await usuario.updateOne(deleteUsuarioDto);
      return { ...usuario.toJSON(), ...deleteUsuarioDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code == 11000) {
      throw new BadRequestException(
        `Usuario exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Usuario - Check server logs`,
    );
  }
}
