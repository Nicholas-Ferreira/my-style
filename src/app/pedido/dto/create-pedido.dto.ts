import { IsArray, IsCreditCard, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateItemPedidoDto } from './create-item-pedidos.dto';

export class CreatePedidoDto {
  @IsNumber()
  idUsuario: number

  @IsNumber()
  idCartao: number

  @IsArray()
  itens: CreateItemPedidoDto[]
}
