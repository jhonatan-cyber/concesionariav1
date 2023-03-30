import { IsBoolean, IsDate, IsMongoId, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

export class CreateCaracteristicaDto {
    @IsString()
    @IsMongoId()
    @IsOptional()
    _id:string;
    @IsString()
    @MinLength(3)
    nombre:string;
    @IsString()
    @MinLength(5)
    descripcion:string;
    @IsDate()
    @IsOptional()
    fecha_creacion:Date;
    @IsBoolean()
    @IsOptional()
    estado:boolean;
}
