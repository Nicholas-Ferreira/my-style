const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

interface Mensagem {
  to?: string;
  from: string;
  subject: string;
}

class Mail {
  private to: string = "contato@archeros.com"
  private from: string
  private subject: string

  constructor(data: Mensagem) {
    if(data.to) this.to = data.to
    this.from = data.from
    this.subject = data.subject
  }

  async send(from?: string): Promise<{ error?: string }> {
    if (!from) from = this.from

    try {
      await sgMail.send({
        to: this.to,
        from: this.from, // Change to your verified sender
        subject: this.subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      })
    } catch (error) {
      return { error }
    }
    return {}
  }

}