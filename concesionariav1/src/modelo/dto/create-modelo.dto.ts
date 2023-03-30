
import { IsString, IsBoolean, IsDate, MinLength, IsOptional, ValidateNested, IsMongoId, IsAlpha, IsArray, IsNotEmpty, IsEmpty, ArrayMinSize } from "class-validator";

export class CreateModeloDto {
    @IsString()
    @IsMongoId()
    @IsOptional()
    _id:string;
    @IsString()
    @MinLength(3)
    nombre: string;
    @IsDate()
    @IsOptional()
    fecha_creacion: Date;
    @IsBoolean()
    @IsOptional()
    estado: boolean;
    @IsMongoId({each: true})
    @ArrayMinSize(1)
    caracteristica: string[];
}
