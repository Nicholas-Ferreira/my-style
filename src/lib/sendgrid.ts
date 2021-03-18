const sgMail = require('@sendgrid/mail')
interface Mensagem {
  to: string;
  subject: string;
  text: string;
}

export class SendGrid {
  private to: string
  private from: string = "archeros.devs@gmail.com"
  private subject: string
  private text: string

  constructor(data: Mensagem) {
    this.to = data.to
    this.subject = data.subject
    this.text = data.text
  }

  async send(to?: string): Promise<{ error?: string }> {
    if (!to) to = this.to

    const email = {
      to: this.to,
      from: this.from, // Change to your verified sender
      subject: this.subject,
      html: this.text,
    }
    const sender = await sgMail.send(email)
      .then((res) => res)
      .catch(err => err)
    console.log('SendGrid: ', email, sender.statusCode)
    return sender
  }

}