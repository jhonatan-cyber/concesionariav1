import { IsBoolean, IsDate, IsMongoId, IsOptional, IsString, MinLength } from "class-validator";

export class CreateMarcaDto {
    @IsString()
    @IsMongoId()
    @IsOptional()
    _id:string;
    @IsString()
    @MinLength(3)
    @IsOptional()
    nombre:string;
    @IsDate()
    @IsOptional()
    fecha_creacion: Date;
    @IsBoolean()
    @IsOptional()
    estado: boolean;
}
