import { Injectable } from '@nestjs/common';
import { Cartao } from 'src/entities/cartao.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateCartaoDto } from '../dto/create-cartao.dto';
import { UpdateCartaoDto } from '../dto/update-cartao.dto';

@Injectable()
export class CartaoService {
  create(usuario: Usuario, createCardDto: CreateCartaoDto): Promise<Cartao> {
    return Cartao.create({ ...createCardDto, usuario }).save()
  }

  findAll() {
    return Cartao.find()
  }

  findOne(id: number) {
    return Cartao.findOne(id)
  }

  update(id: number, updateCartaoDto: UpdateCartaoDto) {
    return Cartao.update(id, updateCartaoDto)
  }

  remove(id: number) {
    return Cartao.delete(id)
  }
}