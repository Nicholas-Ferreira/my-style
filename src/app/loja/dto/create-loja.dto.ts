import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';
import { IsValidCnpj } from 'src/shared/decorators/iscpf-iscnpj.decorator';

export class CreateLojaDto {
  @IsNumber()
  idUsuario: number

  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsValidCnpj({ message: 'CNPJ invalid' })
  @IsNotEmpty()
  cnpj: number;

  @IsString()
  logomarca: string;
}
