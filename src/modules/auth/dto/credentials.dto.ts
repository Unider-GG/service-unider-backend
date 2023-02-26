import { IsString } from 'class-validator';

export class CredentialsDto {
  @IsString({
    message: 'Informe o e-mail da conta',
  })
  email: string;

  @IsString({
    message: 'Informe uma senha válida',
  })
  password: string;
}
