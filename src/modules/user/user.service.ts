import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-roles.enum';
import { UserRepository } from './repositories/user.repository';
import { CreateUserAdminUseCase } from './useCases/createUserAdminUseCase';
import { DeleteUserUseCase } from './useCases/deleteUserUseCase';
import { UpdateUserUseCase } from './useCases/updateUserUseCase';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository,
    @Inject(CreateUserAdminUseCase)
    private createUserAdminUseCase: CreateUserAdminUseCase,
    @Inject(UpdateUserUseCase)
    private updateUserUseCase: UpdateUserUseCase,
    @Inject(DeleteUserUseCase)
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.repository.findUsers(queryDto);
    return users;
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.repository.findById(userId);

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.updateUserUseCase.execute(id, updateUserDto);
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.role === UserRole.ADMIN) {
      return await this.createUserAdminUseCase.execute(createUserDto);
    }
  }

  async deleteUser(userId: string) {
    return await this.deleteUserUseCase.execute(userId);
  }
}
