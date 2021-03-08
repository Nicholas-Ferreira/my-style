import { Expose } from 'class-transformer';
import { IsArray, IsCreditCard, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';

export class CreatePedidoDto {
  @IsNumber()
  @Expose()
  idUsuario: number

  @IsNumber()
  @Expose()
  idCartao: number
  
  @IsArray()
  @Expose()
  itens: {
    produtoId:number;
    preco:number;
    quantidade: number;
  }[];
}
