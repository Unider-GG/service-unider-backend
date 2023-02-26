import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import ReturnEntity from '@shared/interfaces/return-entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@shared/decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-users.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    readonly service: UserService,
  ) {}

  @Get()
  async findUsers(@Query() query: FindUsersQueryDto) {
    const found = await this.service.findUsers(query);
    return {
      found,
      message: 'Usuários encontrados',
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getUser(@Param('id') id: string): Promise<User> {
    return this.service.findUserById(id);
  }

  @Post()
  async createUser(
    @Body(ValidationPipe) body: CreateUserDto,
  ): Promise<ReturnEntity<User>> {
    const user = await this.service.createUser(body);

    return {
      data: user,
      message: 'Usuario cadastrado com sucesso',
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user?.id != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.service.updateUser(id, updateUserDto);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.service.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
