import { Inject, Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ChangePasswordUseCase } from './changePasswordUseCase';
import { ChangePasswordDto } from '@modules/auth/dto/change-password.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository,
    @Inject(ChangePasswordUseCase)
    private changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  async execute(
    recoverToken: string,
    { password }: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.repository.findOneBy({ recoverToken });
    if (!user) throw new NotFoundException('Token inválido.');

    try {
      await this.changePasswordUseCase.execute(user.id.toString(), password);
    } catch (error) {
      throw error;
    }
  }
}
