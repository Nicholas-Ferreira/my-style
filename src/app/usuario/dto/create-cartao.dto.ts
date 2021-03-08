import { IsCreditCard, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';

export class CreateCartaoDto {
  @IsString()
  @IsNotEmpty()
  titular: string;

  //@IsCreditCard()
  @IsNotEmpty()
  numero: number;

  @IsNotEmpty()
  @IsNumber()
  codigo_seguranca: number;

  @IsNotEmpty()
  //@IsDate()
  data_vencimento: Date;
}
