import { PartialType } from '@nestjs/mapped-types';
import { CreateCaracteristicaDto } from './create-caracteristica.dto';

export class UpdateCaracteristicaDto extends PartialType(CreateCaracteristicaDto) {}
