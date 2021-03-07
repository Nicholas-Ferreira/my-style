import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaProduto } from 'src/entities/categoriaProduto.entity';

@Controller('categoria')
export class CategoriaController {
  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return CategoriaProduto.create(createCategoriaDto).save()
  }

  @Get()
  findAll() {
    return CategoriaProduto.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return CategoriaProduto.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return CategoriaProduto.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return CategoriaProduto.delete(+id)
  }
}
