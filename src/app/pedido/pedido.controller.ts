import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Cartao } from 'src/entities/cartao.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { PagarmeService } from 'src/lib/pagarme';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService,
    private readonly pagarmeService: PagarmeService
  ) { }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createPedidoDto: CreatePedidoDto,
    @GetUser() usuario: Usuario
  ) {
    const pedido = await this.pedidoService.create(usuario, createPedidoDto);
    const pagamento = await this.pagarmeService.pagar(pedido)

    return pagamento
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }
}
