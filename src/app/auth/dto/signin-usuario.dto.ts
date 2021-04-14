import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class SignInUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  senha: string;
}
