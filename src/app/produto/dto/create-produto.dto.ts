
import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProdutoDto {
  @IsNumber()
  idLoja: number

  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsNumber()
  preco: number;

  @IsString()
  style: string;

  @IsBoolean()
  frete: boolean;

  @IsArray()
  @ArrayMinSize(1)
  tamanhos: {
    id: number;
  }[];
}
