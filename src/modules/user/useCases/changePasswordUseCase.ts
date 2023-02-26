import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  async execute(id: string, password: string): Promise<void> {
    const user = await this.repository.findById(id);

    user.salt = await bcrypt.genSalt();
    user.password = await this.repository.hashPassword(password, user.salt);
    user.recoverToken = null;
    await this.repository.save(user);
  }
}
