import { IsCreditCard, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Loja } from 'src/entities/loja.entity';
import { Usuario } from 'src/entities/usuario.entity';

export class CreateProdutoDto {
  @IsNumber()
  idLoja: number
  
  @IsNumber()
  @IsNotEmpty()
  preco: number

  @IsString()
  @IsNotEmpty()
  tamanho: string;

  @IsNotEmpty()
  @IsString()
  cor: string;

}
