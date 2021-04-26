import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';

@Controller('endereco')
export class EnderecoController {
  constructor(
    private readonly enderecoService: EnderecoService,
  ) { }

  @Post()
  async append(
    @GetUser() usuario: Usuario,
    @Body() createEnderecoDto: CreateEnderecoDto
  ) {
    return this.enderecoService.create(usuario, createEnderecoDto)
  }

  @Get()
  findAll(
    @GetUser() usuario: Usuario,
  ) {
    return this.enderecoService.findAll(usuario);
  }

  @Get(':id')
  findOne(
    @GetUser() usuario: Usuario,
    @Param('id') id: string,
  ) {
    return this.enderecoService.findOne(usuario, +id);
  }

  @Put(':id')
  update(
    @GetUser() usuario: Usuario,
    @Param('id') id: string,
    @Body() updateEnderecoDto: UpdateEnderecoDto
  ) {
    return this.enderecoService.update(usuario, +id, updateEnderecoDto);
  }

  @Delete(':id')
  remove(
    @GetUser() usuario: Usuario,
    @Param('id') id: string,
  ) {
    return this.enderecoService.remove(usuario, +id);
  }
}