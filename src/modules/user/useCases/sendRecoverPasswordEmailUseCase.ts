import { Inject, Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class SendRecoverPasswordEmailUseCase {
  constructor(
    @Inject(ConfigService) private config: ConfigService,
    @Inject(MailerService) private mailerService: MailerService,
    @InjectRepository(UserRepository)
    private repository: UserRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.repository.findOneBy({ email });

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    user.recoverToken = randomBytes(32).toString('hex');
    this.repository.save(user);

    const mail = {
      to: user.email,
      from: 'noreply@application.com',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: user.recoverToken,
        frontBaseUrl: this.config.get<string>('FRONT_BASE_URL'),
      },
    };
    await this.mailerService.sendMail(mail);
  }
}
