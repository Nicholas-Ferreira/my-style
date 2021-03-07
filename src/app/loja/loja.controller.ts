import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Usuario } from 'src/entities/usuario.entity';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) { }

  @Post()
  async create(
    @Body() createLojaDto: CreateLojaDto
  ) {
    const usuario = await Usuario.findOne(createLojaDto.idUsuario)
    return this.lojaService.create(usuario, createLojaDto);
  }

  @Get()
  findAll() {
    return this.lojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lojaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojaService.update(+id, updateLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lojaService.remove(+id);
  }
}
