import { InternalServerErrorException } from "@nestjs/common"
import { extname } from "path"
import encode from "src/utils/encode"

const sgMail = require('@sendgrid/mail')
interface Mensagem {
  to: string;
  subject: string;
  bcc?: string;
  responseTo?: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: Object;
  anexo?: Array<{ url: string, nome: string }>
}

export class SendGrid {
  private from: string = "archeros.devs@gmail.com"
  private email: Mensagem

  constructor(email: Mensagem) {
    this.email = email
  }

  async send(_to?: string): Promise<{ error?: string }> {
    const { to, subject, text, html, bcc, anexo = [], templateId, dynamicTemplateData } = this.email
    if (!_to) _to = to

    const anexos = await Promise.all(anexo.map(async anexo => {
      const extUrl = extname(anexo.url);
      const extName = extname(anexo.nome);
      if (extUrl !== extName) throw new InternalServerErrorException();

      const { type, content } = await encode(anexo.url);
      return {
        type,
        filename: anexo.nome,
        content,
        disposition: 'attachment'
      };
    }));

    const email = {
      to: _to,
      from: this.from,
      subject,
      bcc,
      replyTo: this.from,
      text,
      html,
      attachments: anexos,
      templateId,
      dynamicTemplateData
    }

    const sender = await sgMail.send(email)
      .then((res) => res)
      .catch(err => err)
    console.log('SendGrid: ', email, sender.statusCode)
    return sender
  }
}