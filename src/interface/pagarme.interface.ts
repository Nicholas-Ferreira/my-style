
export interface ICardPagarme {
  card_holder_name: string
  card_expiration_date: string
  card_number: string
  card_cvv: number
}

export interface ICardValidation {
  card: {
    card_number?: string;
    card_holder_name?: string;
    card_expiration_month?: string;
    card_expiration_year?: string;
    card_cvv?: string;
  }
}
export interface IPagarmeClient {
  transactions: {
    create(transaction: any): Promise<IResponsePayment>;
    all: Function
  }
  validate(valid: { card: ICardPagarme }): ICardValidation
  security: {
    encrypt(card: ICardPagarme): Promise<string>
  }
}

export interface IResponseCardId {
  object: 'card',
  id: string; //'card_cknwdr78l1vlv0o9tnn2w2ufv',
  date_created: string; //'2021-04-24T23:34:57.381Z',
  date_updated: string; //'2021-04-24T23:34:57.942Z',
  brand: string; //'mastercard',
  holder_name: string; //'NICHOALAS',
  first_digits: string; //'557255',
  last_digits: string; //'7745',
  country: string; //'UNITED STATES OF AMERICA',
  fingerprint: string; //'cknwd5iuo26b80m76ngzg1uev',
  customer: null,
  valid: boolean,
  expiration_date: string //'0522'
}

export interface IResponsePayment {
  "object": string; // "transaction",
  "status": 'processing' | 'authorized' | 'paid' | 'refunded' | 'waiting_payment' | 'pending_refund' | 'refused';
  "refse_reason": null | 'acquirer' | 'antifraud' | 'internal_error' | 'no_acquirer' | 'acquirer_timeout'
  "status_reason": string | 'acquirer' | 'antifraud' | 'internal_error' | 'no_acquirer' | 'acquirer_timeout'; // "acquirer",
  "acquirer_response_code": string; // "0000",
  "acquirer_name": string; // "pagarme",
  "acquirer_id": string; // "5969170917bce0470c8bf099",
  "authorization_code": string; // "65208",
  "soft_descriptor": null,
  "tid": number; // 1830855,
  "nsu": number; // 1830855,
  "date_created": Date; // "2017-08-14T20:35:46.046Z",
  "date_updated": Date; // "2017-08-14T20:35:46.455Z",
  "amount": number; // 10000,
  "authorized_amount": number; // 10000,
  "paid_amount": number; // 10000,
  "refunded_amount": number; // 0,
  "installments": number; // 1,
  "id": number; // 1830855,
  "cost": number; // 50,
  "card_holder_name": string; // "Morpheus Fishburne",
  "card_last_digits": string; // "1111",
  "card_first_digits": string; // "411111",
  "card_brand": string; // "visa",
  "card_pin_mode": null,
  "postback_url": null,
  "payment_method": string; // "credit_card",
  "capture_method": string; // "ecommerce",
  "antifraud_score": null,
  "boleto_url": null,
  "boleto_barcode": null,
  "boleto_expiration_date": null,
  "referer": string; // "api_key",
  "ip": string; // "10.2.11.17",
  "subscription_id": null,
  "phone": null,
  "address": null,
  "customer": {
    "object": string; // "customer",
    "id": number; // 233238,
    "external_id": string; // "#3311",
    "type": string; // "individual",
    "country": string; // "br",
    "document_number": null,
    "document_type": string; // "cpf",
    "name": string; // "Morpheus Fishburne",
    "email": string; // "mopheus@nabucodonozor.com",
    "phone_numbers": Array<string>,
    "born_at": null,
    "birthday": string; // "1965-01-01",
    "gender": null,
    "date_created": string; // "2017-08-14T20:35:45.963Z",
    "documents": Array<{
      "object": string; // "document",
      "id": string; // "doc_cj6cmcm2l01z5696dyamemdnf",
      "type": string; // "cpf",
      "number": string; // "30621143049"
    }>
  },
  "billing": {
    "address": {
      "object": string; // "address",
      "street": string; // "Rua Matrix",
      "complementary": null,
      "street_number": string; // "9999",
      "neighborhood": string; // "Rio Cotia",
      "city": string; // "Cotia",
      "state": string; // "sp",
      "zipcode": string; // "06714360",
      "country": string; // "br",
      "id": number; // 145818
    },
    "object": string; // "billing",
    "id": number; // 30,
    "name": string; // "Trinity Moss"
  },
  "shipping": {
    "address": {
      "object": string; // "address",
      "street": string; // "Rua Matrix",
      "complementary": null,
      "street_number": string; // "9999",
      "neighborhood": string; // "Rio Cotia",
      "city": string; // "Cotia",
      "state": string; // "sp",
      "zipcode": string; // "06714360",
      "country": string; // "br",
      "id": number; // 145819
    },
    "object": string; // "shipping",
    "id": number; // 25,
    "name": string; // "Neo Reeves",
    "fee": number; // 1000,
    "delivery_date": string; // "2000-12-21",
    "expedited": boolean
  },
  "items": [
    {
      "object": string; // "item",
      "id": string; // "r123",
      "title": string; // "Red pill",
      "unit_price": number; // 10000,
      "quantity": number; // 1,
      "category": null,
      "tangible": boolean,
      "venue": null,
      "date": null
    },
    {
      "object": string; // "item",
      "id": string; // "b123",
      "title": string; // "Blue pill",
      "unit_price": number; // 10000,
      "quantity": number; // 1,
      "category": null,
      "tangible": boolean,
      "venue": null,
      "date": null
    }
  ],
  "card": {
    "object": string; // "card",
    "id": string; // "card_cj6cmcm4301z6696dt3wypskk",
    "date_created": Date; // "2017-08-14T20:35:46.036Z",
    "date_updated": Date; // "2017-08-14T20:35:46.524Z",
    "brand": string; // "visa",
    "holder_name": string; // "Morpheus Fishburne",
    "first_digits": string; // "411111",
    "last_digits": string; // "1111",
    "country": string; // "UNITED STATES",
    "fingerprint": string; // "3ace8040fba3f5c3a0690ea7964ea87d97123437",
    "valid": boolean,
    "expiration_date": string; // "0922"
  },
  "split_rules": null,
  "metadata": {},
  "antifraud_metadata": {},
  "reference_key": null
}
