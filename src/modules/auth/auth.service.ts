import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SendRecoverPasswordEmailUseCase } from '@modules/user/useCases/sendRecoverPasswordEmailUseCase';
import { ResetPasswordUseCase } from '@modules/user/useCases/resetPasswordUseCase';
import { CredentialsDto } from './dto/credentials.dto';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(ResetPasswordUseCase)
    private resetPasswordUseCase: ResetPasswordUseCase,
    @Inject(SendRecoverPasswordEmailUseCase)
    private sendRecoverPasswordEmailUseCase: SendRecoverPasswordEmailUseCase,
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    await this.sendRecoverPasswordEmailUseCase.execute(email);
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    await this.resetPasswordUseCase.execute(recoverToken, changePasswordDto);
  }
}
