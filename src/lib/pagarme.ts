import { Pedido } from './../entities/pedido.entity';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { ReponsePayment } from 'src/interface/pagarme.interface';
const pagarme = require('pagarme')

@Injectable()
export class PagarmeService {
  constructor() {
    pagarme.client.connect({ api_key: process.env.PAGARME_API_KEY })
      .then(client => client.transactions.all())
      .then(transactions => console.log(transactions))
      .catch(error => { throw new Error(error) })
  }

  pagar(pedido: Pedido): Promise<ReponsePayment> {
    return pagarme.client.transactions.create({
      amount: pedido.detalhes.reduce((valorTotal, item) => (valorTotal + item.preco), 0),
      card_number: pedido.cartao.numero,
      card_cvv: pedido.cartao.codigo_seguranca,
      card_expiration_date: dayjs(pedido.cartao.data_vencimento).format('YYMM'),
      card_holder_name: pedido.cartao.titular,
      customer: {
        external_id: pedido.usuario.id,
        name: pedido.usuario.nome,
        type: 'individual',
        country: 'br',
        email: pedido.usuario.email,
        documents: [{ type: 'cpf', number: pedido.usuario.documento }],
        phone_numbers: [`+55${pedido.usuario.telefone}`],
      },
      payment_method: 'credit_card',
      billing: {
        name: 'Endereço de Entrega',
        address: {
          state: pedido.endereco.estado,
          zipcode: pedido.endereco.cep,
          street_number: pedido.endereco.numero.toString(),
          city: pedido.endereco.cidade,
          neighborhood: pedido.endereco.bairro,
          street: pedido.endereco.endereco,
          country: 'br',
        },
      },
      items: pedido.detalhes.map(item => ({
        id: item.produto.id,
        title: item.produto.categoria.nome,
        unit_price: item.preco * 100, // R$ 10,10 = 1010
        quantity: item.quantidade,
        tangible: true
      })),
      metadata: {
        invoice_id: pedido.id,
      },
      capture: true,
      async: false,
      // postback_url: '', // Endpoint do seu sistema que receberá informações a cada atualização da transação. Caso você defina este parâmetro, o processamento da transação se torna assíncrono.
    });
  }
}