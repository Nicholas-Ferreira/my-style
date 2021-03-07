import { IsCreditCard, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';

export class CreateItemPedidoDto {
  @IsNumber()
  idProduto: number
  
  @IsNumber()
  @IsNotEmpty()
  quantidade: number
}