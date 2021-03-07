import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { CartaoService } from './services/cartao.service';
import { CreateCartaoDto } from './dto/create-cartao.dto';
import { UpdateCartaoDto } from './dto/update-cartao.dto';

@Controller('usuario/:idUsuario/cartao')
export class CartaoController {
  constructor(
    private readonly cartaoService: CartaoService,
  ) { }

  @Post()
  async appendCard(
    @Param('idUsuario') idUsuario: string,
    @Body() createCardDto: CreateCartaoDto
  ) {
    const usuario = await Usuario.findOne(idUsuario)
    return this.cartaoService.create(usuario, createCardDto)
  }

  @Get()
  cardFindAll() {
    return this.cartaoService.findAll();
  }

  @Get(':idCartao')
  cardFindOne(
    @Param('idUsuario') idUsuario: string,
    @Param('idCartao') idCartao: string,
  ) {
    return this.cartaoService.findOne(+idCartao);
  }

  @Put(':idCartao')
  cardUpdate(
    @Param('idUsuario') idUsuario: string,
    @Param('idCartao') idCartao: string,
    @Body() updateCartaoDto: UpdateCartaoDto
  ) {
    return this.cartaoService.update(+idCartao, updateCartaoDto);
  }

  @Delete(':idCartao')
  cardRemove(
    @Param('idUsuario') idUsuario: string,
    @Param('idCartao') idCartao: string,
  ) {
    return this.cartaoService.remove(+idCartao);
  }
}
