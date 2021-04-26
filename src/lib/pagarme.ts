import { ItemPedido } from 'src/entities/itemPedido.entity';
import { CreateCartaoDto } from './../app/cartao/dto/create-cartao.dto';
import { BadGatewayException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Pedido } from './../entities/pedido.entity';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import axios from 'axios'
import { IPagarmeClient, IResponseCardId, IResponsePayment } from 'src/interface/pagarme.interface';
const pagarme = require('pagarme')

@Injectable()
export class PagarmeService {
  private async client(): Promise<IPagarmeClient> {
    return await pagarme.client.connect({ api_key: process.env.PAGARME_API_KEY })
      .catch(error => { throw new InternalServerErrorException(error) })
  }

  async pagar(pedido: Pedido): Promise<IResponsePayment> {
    const { detalhes, cartao, usuario, endereco } = pedido
    if (!detalhes || !cartao || !usuario || !endereco || !cartao.hash) {
      console.log(!detalhes, !cartao, !usuario, !endereco, !cartao.hash)
      throw new InternalServerErrorException("Falha ao processar pedido")
    }
    try {
      const total = detalhes.reduce((valorTotal, item) => (valorTotal + +item.preco), 0)
      const transactionData = {
        amount: total * 100,
        payment_method: 'credit_card',
        card_id: cartao.hash,
        customer: {
          external_id: usuario.id,
          name: usuario.nome,
          type: 'individual',
          country: 'br',
          email: usuario.email,
          documents: [{ type: 'cpf', number: usuario.documento }],
          phone_numbers: [`+55${usuario.telefone}`],
        },
        billing: {
          name: 'Endereço de Entrega',
          address: {
            state: endereco.estado,
            zipcode: endereco.cep,
            street_number: endereco.numero,
            city: endereco.cidade,
            neighborhood: endereco.bairro,
            street: endereco.logradouro,
            country: 'br',
          },
        },
        items: detalhes.map(item => ({
          id: `${item.produto.id}`,
          title: item.produto.titulo,
          unit_price: item.preco * 100, // R$ 10,10 = 1010
          quantity: item.quantidade,
          tangible: true
        })),
        split_rules: this.splitRules(detalhes, total),
        metadata: {
          invoice_id: pedido.id,
        },
        capture: true,
        async: false,
      }
      console.log(transactionData)

      const client = await this.client()
      const transaction = await client.transactions.create(transactionData)
      pedido.status = transaction.status
      await pedido.save()

      console.log(transaction)
      return transaction
    } catch ({ response }) {
      if (response) {
        if (response.status == 400) throw new BadRequestException(response.errors)
      }
      throw new InternalServerErrorException('Não foi possivel processar seu pedido')
    }
  }

  async encryptCard(cardDto: CreateCartaoDto): Promise<any> {
    const card = {
      card_holder_name: cardDto.card_holder_name.toUpperCase(),
      card_number: cardDto.card_number,
      card_cvv: cardDto.card_cvv,
      card_expiration_date: dayjs(cardDto.card_expiration_date).format('MM/YY'),
    }

    const { card: cardValidations } = pagarme.validate({ card })

    if (!cardValidations.card_number)
      throw new BadRequestException("Número do cartão inválido.")
    if (!cardValidations.card_holder_name)
      throw new BadRequestException("Nome do portador inválido.")
    if (!cardValidations.card_expiration_date)
      throw new BadRequestException("Data de expiração inválido.")
    if (!cardValidations.card_cvv)
      throw new BadRequestException("Código de segurança inválido.")

    const client = await this.client()
    const card_hash = await client.security.encrypt(card)
    const { status, data } = await axios.post<IResponseCardId>(`https://api.pagar.me/1/cards`, {
      api_key: process.env.PAGARME_API_KEY,
      card_hash: card_hash
    })
    if (status !== 200) throw new BadGatewayException(data)

    return data.id
  }

  private splitRules(itens: ItemPedido[], total: number) {
    const split = {}

    itens.map(i => {
      console.log(i.produto)
      const loja = split[i.produto.loja.hash]
      if (loja == undefined) split[i.produto.loja.hash] = 0
      split[i.produto.loja.hash] += +i.preco
      console.log(split, split[i.produto.loja.hash])
    })
    
    const split_rules = []
    for (const hash in split) {
      if (Object.prototype.hasOwnProperty.call(split, hash)) {
        const valor = split[hash];
        split_rules.push({
          recipient_id: hash,
          amount: valor * 100
        })
      }
    }

    return split_rules
  }
}