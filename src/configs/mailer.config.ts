import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
  options: {
    strict: true,
  },
  template: {
    dir: path.resolve(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
    },
  },
  transport: `smtps://${process.env.MAILER_USER}:${process.env.MAILER_PASS}@smtp.${process.env.MAILER_DOMAIN}.com`,
};
