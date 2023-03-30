import { IsBoolean, IsDate, IsEmail, IsMongoId, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsOptional()
    @IsMongoId()
    _id: string;
    @IsString()
    @MinLength(4)
    nombre : string;
    @IsString()
    @MinLength(4)
    apellido : string;
    @IsString()
    @MinLength(4)
    direccion : string;
    @IsNumberString()
    @MinLength(8)
    @MaxLength(8)
    telefono : string;
    @IsDate()
    fecha_nacimiento : Date;
    @IsString()
    @MinLength(4)
    usuario : string;
    @IsEmail()
    correo : string;
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    password : string;
    @IsOptional()
    @IsDate()
    fecha_creacion : Date;
    @IsBoolean()
    @IsOptional()
    estado : boolean;
    @IsString()
    @IsOptional()
    url : string;
}
