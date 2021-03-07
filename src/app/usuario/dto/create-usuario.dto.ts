import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { IsValidCpf } from 'src/shared/decorators/iscpf-iscnpj.decorator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsValidCpf({ message: 'CPF invalid' })
  @IsNotEmpty()
  cpf: string;

  @MinLength(8)
  @IsNotEmpty()
  senha: string;

  @IsNumber()
  @IsNotEmpty()
  idade: number;
}
