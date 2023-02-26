import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-users.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.findById(id);

    const { name, email, role, isDeleted } = updateUserDto;
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;
    user.isDeleted = isDeleted ?? user.isDeleted;
    try {
      await this.repository.save(user);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
}
