import { PagarmeService } from 'src/lib/pagarme';
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { CartaoService } from './cartao.service';
import { CreateCartaoDto } from './dto/create-cartao.dto';
import { UpdateCartaoDto } from './dto/update-cartao.dto';
import { lastNumberCard } from 'src/utils/string';

@Controller('cartao')
export class CartaoController {
  constructor(
    private readonly cartaoService: CartaoService,
    private readonly pagarmeService: PagarmeService,
  ) { }

  @Post()
  async appendCard(
    @GetUser() usuario: Usuario,
    @Body() createCardDto: CreateCartaoDto
  ) {
    const card_hash = await this.pagarmeService.encryptCard(createCardDto)
    return this.cartaoService.create(usuario, createCardDto, card_hash)
  }

  @Get()
  cardFindAll(
    @GetUser() usuario: Usuario
  ) {
    return this.cartaoService.findAll(usuario);
  }

  @Get(':id')
  cardFindOne(
    @GetUser() usuario: Usuario,
    @Param('id') id: string,
  ) {
    return this.cartaoService.findOne(usuario, +id);
  }

  @Delete(':id')
  cardRemove(
    @GetUser() usuario: Usuario,
    @Param('id') id: string,
  ) {
    return this.cartaoService.remove(usuario, +id);
  }
}