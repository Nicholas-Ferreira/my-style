import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  cep: string;

  @IsNotEmpty()
  @IsString()
  complemento: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;
}