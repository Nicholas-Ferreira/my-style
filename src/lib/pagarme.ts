import { InternalServerErrorException } from '@nestjs/common';
import { Pedido } from './../entities/pedido.entity';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { ReponsePayment } from 'src/interface/pagarme.interface';
const pagarme = require('pagarme')

interface PagarmeClient {
  transactions: {
    create: Function;
    all: Function
  }
 }
@Injectable()
export class PagarmeService {
  private client: PagarmeClient
  constructor() {
    pagarme.client.connect({ api_key: process.env.PAGARME_API_KEY })
      .then(client => client.transactions.all())
      .then(client => this.client = client)
      .catch(error => { throw new Error(error) })
  }

  async pagar(pedido: Pedido): Promise<ReponsePayment> {
    const { detalhes, cartao, usuario, endereco } = pedido
    if (!detalhes || !cartao || !usuario || !endereco)
      throw new InternalServerErrorException("Falha ao processar pedido")

    try {
      const transaction = await this.client.transactions.create({
        amount: detalhes.reduce((valorTotal, item) => (valorTotal + item.preco), 0),
        payment_method: 'credit_card',
        card_number: cartao.numero,
        card_cvv: cartao.codigo_seguranca,
        card_expiration_date: moment(cartao.data_vencimento).format('YYMM'),
        card_holder_name: cartao.titular,
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
            street_number: endereco.numero.toString(),
            city: endereco.cidade,
            neighborhood: endereco.bairro,
            street: endereco.endereco,
            country: 'br',
          },
        },
        items: detalhes.map(item => ({
          id: item.produto.id,
          title: item.produto.titulo,
          unit_price: item.preco * 100, // R$ 10,10 = 1010
          quantity: item.quantidade,
          tangible: true
        })),
        /*split_rules: [
          {
            "recipient_id": "re_cj6cglnhc0bbcbt6dbsl8fdcs",
            "percentage": 50,
            "liable": true,
            "charge_processing_fee": true
          }
        ],*/
        metadata: {
          invoice_id: pedido.id,
        },
        capture: true,
        async: false,
        // postback_url: '', // Endpoint do seu sistema que receberá informações a cada atualização da transação. Caso você defina este parâmetro, o processamento da transação se torna assíncrono.
      })
      console.log(transaction)
      return transaction
    } catch (error) {
      console.log(error)
      return error
    }
  }
}