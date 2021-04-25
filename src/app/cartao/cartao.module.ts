import { Module } from '@nestjs/common';
import { CartaoService } from './cartao.service';
import { CartaoController } from './cartao.controller';
import { PassportModule } from '@nestjs/passport';
import { PagarmeService } from 'src/lib/pagarme';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CartaoController],
  providers: [CartaoService, PagarmeService]
})
export class CartaoModule {}