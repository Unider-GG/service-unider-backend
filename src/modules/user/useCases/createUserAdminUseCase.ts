import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { UnprocessableEntityException } from '@nestjs/common';
import { UserRole } from '../enums/user-roles.enum';

@Injectable()
export class CreateUserAdminUseCase {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.repository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
}
