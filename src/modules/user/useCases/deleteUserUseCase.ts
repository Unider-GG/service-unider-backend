import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user.id) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }

    user.isDeleted = true;
    try {
      await this.repository.save(user);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao deletar o usuario no banco de dados',
      );
    }
  }
}
