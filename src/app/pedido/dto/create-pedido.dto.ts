import { Expose } from 'class-transformer';
import { IsArray, IsCreditCard, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';

export class CreatePedidoDto {
  @IsNumber()
  @Expose()
  idCartao: number

  @IsNumber()
  @Expose()
  idEndereco: number

  @IsNumber()
  @Expose()
  parcelado: number
  
  @IsArray()
  @Expose()
  itens: {
    produtoId:number;
    quantidade: number;
  }[];
}
