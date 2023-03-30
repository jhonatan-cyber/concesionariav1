import { IsString, IsBoolean, IsDate, MinLength, IsOptional, IsMongoId, IsNumber } from "class-validator";


export class CreateVehiculoDto {
    @IsString()
    @MinLength(3)
    nombre: string;
    @IsNumber()
    @IsOptional()
    precio: number;
    @IsNumber()
    @IsOptional()
    stock: number;
    @IsDate()
    @IsOptional()
    fecha_creacion: Date;
    @IsBoolean()
    @IsOptional()
    estado: boolean;
    @IsMongoId()
    modelo: string;
    @IsMongoId()
    marca: string;
}
