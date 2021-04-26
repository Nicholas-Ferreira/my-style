import { NotFoundException } from '@nestjs/common/exceptions';
import { Produto } from './../../entities/produto.entity';
import { Injectable, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Cartao } from 'src/entities/cartao.entity';
import { ItemPedido } from 'src/entities/itemPedido.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { getConnection } from 'typeorm';
import { PagarmeService } from 'src/lib/pagarme';

@Injectable()
export class PedidoService {
  async create(usuario: Usuario, pedidoDto: CreatePedidoDto) {
    const cartao = await usuario.findCartaoById(pedidoDto.idCartao, { select: ['id', 'hash'] })
    if (!cartao) throw new NotFoundException("Catão invalido")

    const endereco = await usuario.findEnderecoById(pedidoDto.idEndereco)
    if (!endereco) throw new NotFoundException("Endereço invalido")

    const pedido = Pedido.create({ usuario, cartao, endereco, parcelado: pedidoDto.parcelado })

    pedido.detalhes = await Promise.all(pedidoDto.itens.map(async item => {
      const produto = await Produto.findOne(item.produtoId, {relations: ['loja']})
      return ItemPedido.create({
        quantidade: item.quantidade,
        preco: produto.preco,
        produto: produto
      })
    }))
    return pedido.save()
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
