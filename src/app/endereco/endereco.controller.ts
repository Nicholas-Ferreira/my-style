import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Controller('usuario/:idUsuario/endereco')
export class EnderecoController {
  constructor(
    private readonly enderecoService: EnderecoService,
  ) { }

  @Post()
  async appendCard(
    @Param('idUsuario') idUsuario: string,
    @Body() createCardDto: CreateEnderecoDto
  ) {
    const usuario = await Usuario.findOne(idUsuario)
    return this.enderecoService.create(usuario, createCardDto)
  }

  @Get()
  cardFindAll() {
    return this.enderecoService.findAll();
  }

  @Get(':idEndereco')
  cardFindOne(
    @Param('idUsuario') idUsuario: string,
    @Param('idEndereco') idEndereco: string,
  ) {
    return this.enderecoService.findOne(+idEndereco);
  }

  @Put(':idEndereco')
  cardUpdate(
    @Param('idUsuario') idUsuario: string,
    @Param('idEndereco') idEndereco: string,
    @Body() updateEnderecoDto: UpdateEnderecoDto
  ) {
    return this.enderecoService.update(+idEndereco, updateEnderecoDto);
  }

  @Delete(':idEndereco')
  cardRemove(
    @Param('idUsuario') idUsuario: string,
    @Param('idEndereco') idEndereco: string,
  ) {
    return this.enderecoService.remove(+idEndereco);
  }
}