import { IsCreditCard, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';
import { IsValidDate } from 'src/shared/decorators/isdate.decorator';

export class CreateCartaoDto {
  @IsString()
  @IsNotEmpty()
  card_holder_name: string;

  @IsCreditCard()
  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  @IsNumber()
  card_cvv: number;

  @IsNotEmpty()
  @IsValidDate()
  card_expiration_date: Date;
}