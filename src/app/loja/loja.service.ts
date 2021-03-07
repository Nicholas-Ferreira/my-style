import { Injectable } from '@nestjs/common';
import { Loja } from 'src/entities/loja.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Injectable()
export class LojaService {
  create(usuario: Usuario, createLojaDto: CreateLojaDto) {
    return Loja.create({
      ...createLojaDto,
      representante: usuario
    }).save()
  }

  findAll() {
    return Loja.find()
  }

  findOne(id: number) {
    return Loja.findOne(id)
  }

  update(id: number, updateLojaDto: UpdateLojaDto) {
    return Loja.update(id, updateLojaDto)
  }

  remove(id: number) {
    return Loja.delete(id)
  }
}
