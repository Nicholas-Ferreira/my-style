import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class SignUpUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  senha: string;

  @MinLength(8)
  @IsNotEmpty()
  confirmar_senha: string;
}
