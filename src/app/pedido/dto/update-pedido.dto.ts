import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { IStatus } from 'src/entities/pedido.entity';
import { CreatePedidoDto } from './create-pedido.dto';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
  @IsNotEmpty()
  @IsString()
  status: IStatus;
}
