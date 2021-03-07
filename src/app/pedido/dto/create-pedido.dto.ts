import { IsCreditCard, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';

export class CreatePedidoDto {
  @IsNumber()
  idUsuario: number
  
  @IsNumber()
  @IsNotEmpty()
  quantidade: number

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  produto: string;

}