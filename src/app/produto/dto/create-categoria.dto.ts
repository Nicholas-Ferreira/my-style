import { IsCreditCard, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Loja } from 'src/entities/loja.entity';
import { Usuario } from 'src/entities/usuario.entity';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  estilo: string

  @IsString()
  marca: string;
  
  @IsNotEmpty()
  @IsString()
  nome: string;
}
