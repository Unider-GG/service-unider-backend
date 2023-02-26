import { User } from '@modules/user/entities/user.entity';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req): User => {
  const user = req.args[0].user;
  return user;
});
