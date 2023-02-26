import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { ChangePasswordUseCase } from './useCases/changePasswordUseCase';
import { CreateUserAdminUseCase } from './useCases/createUserAdminUseCase';
import { DeleteUserUseCase } from './useCases/deleteUserUseCase';
import { ResetPasswordUseCase } from './useCases/resetPasswordUseCase';
import { SendRecoverPasswordEmailUseCase } from './useCases/sendRecoverPasswordEmailUseCase';
import { UpdateUserUseCase } from './useCases/updateUserUseCase';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    ChangePasswordUseCase,
    SendRecoverPasswordEmailUseCase,
    ResetPasswordUseCase,
    CreateUserAdminUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    UserRepository,
    ChangePasswordUseCase,
    SendRecoverPasswordEmailUseCase,
    ResetPasswordUseCase,
  ],
})
export class UserModule {}
