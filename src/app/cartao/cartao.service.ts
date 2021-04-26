import { ConflictException, Injectable } from '@nestjs/common';
import { Cartao } from 'src/entities/cartao.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { lastNumberCard } from 'src/utils/string';
import { CreateCartaoDto } from './dto/create-cartao.dto';
import { UpdateCartaoDto } from './dto/update-cartao.dto';

@Injectable()
export class CartaoService {
  async create(usuario: Usuario, createCardDto: CreateCartaoDto, card_hash: string) {
    const cartao = await Cartao.findOne({ where: { hash: card_hash } })
    if (cartao) throw new ConflictException('Cartão já cadastrado')

    const _cartao = new Cartao()
    _cartao.titular = createCardDto.card_holder_name.toUpperCase()
    _cartao.numero = lastNumberCard(createCardDto.card_number)
    _cartao.data_vencimento = createCardDto.card_expiration_date
    _cartao.hash = card_hash
    _cartao.usuario = usuario
    _cartao.save()

    delete _cartao.hash
    return _cartao
  }

  findAll(usuario: Usuario) {
    return Cartao.find()
  }

  findOne(usuario: Usuario, id: number) {
    return Cartao.findOne(id)
  }

  remove(usuario: Usuario, id: number) {
    return Cartao.delete(id)
  }
}