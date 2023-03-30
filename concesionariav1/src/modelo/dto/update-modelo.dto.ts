import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateModeloDto } from './create-modelo.dto';

export class UpdateModeloDto extends PartialType(CreateModeloDto) {
    @IsOptional()
    caracteristica: string[];
}
