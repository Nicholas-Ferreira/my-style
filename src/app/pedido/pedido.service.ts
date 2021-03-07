import { Injectable } from '@nestjs/common';
import { Cartao } from 'src/entities/cartao.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  create(usuario: Usuario, cartao: Cartao, createPedidoDto: CreatePedidoDto) {
    return Pedido.create({ ...createPedidoDto, usuario, cartao }).save()
  }

  findAll() {
    return Pedido.find()
  }

  findOne(id: number) {
    return Pedido.findOne(id, { relations: ['cartao', 'usuario'] })
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return Pedido.update(id, updatePedidoDto)
  }

  remove(id: number) {
    return Pedido.delete(id)
  }
}
