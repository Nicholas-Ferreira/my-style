import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PagarmeService } from 'src/lib/pagarme';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService, PagarmeService]
})
export class PedidoModule {}
