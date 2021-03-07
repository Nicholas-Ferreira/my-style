import { PartialType } from '@nestjs/mapped-types';
import { CreateCartaoDto } from './create-cartao.dto';

export class UpdateCartaoDto extends PartialType(CreateCartaoDto) {}
