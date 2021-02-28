import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebers from 'handlebars';

class SendMailService {
  private client: Transporter
  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
      });

      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf8');

    const mailTemplateParse = handlebers.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'NPS<noreplay@nps.com.br>',
      subject,
      html
    });

    console.log('Message sent: %s', message.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();