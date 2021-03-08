import { Produto } from './../../entities/produto.entity';
import { Injectable } from '@nestjs/common';
import { Cartao } from 'src/entities/cartao.entity';
import { ItemPedido } from 'src/entities/itemPedido.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  async create(usuario: Usuario, cartao: Cartao, createPedidoDto: CreatePedidoDto) {
    const pedido = await Pedido.create({ ...createPedidoDto, usuario, cartao }).save()
    createPedidoDto.itens.map(async item => {
      const produto = await Produto.findOne(item.produtoId)
      await ItemPedido.create({
        preco: produto.preco,
        quantidade: item.quantidade,
        pedido: pedido,
        produto: produto
      }).save()
    })
    return pedido
  }

  findAll() {
    return Pedido.find({ relations: ['cartao', 'usuario', 'detalhes'] })
  }

  findOne(id: number) {
    return Pedido.findOne(id, { relations: ['cartao', 'usuario', 'detalhes'] })
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return Pedido.update(id, updatePedidoDto)
  }

  async remove(id: number) {
    const pedido = await Pedido.findOneOrFail(id)
    return pedido.softRemove()
  }
}
