import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';

import { IAuthenticateUserRepository } from '@modules/user/repositories/IAuthenticateUserRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/errors/appErrors';

interface IRequest {
    username?: string;
    email?: string;
    password: string;
}
@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AuthenticateUserService {
  constructor(
        @inject('AuthenticateUserRepository')
        private authenticateUserRepository: IAuthenticateUserRepository
  ) {}

  async execute({ email, username, password }: IRequest) {
    let user: User;

    if (email) {
      user = await this.authenticateUserRepository.findEmail(email);
    } else if (username) {
      user = await this.authenticateUserRepository.findUsername(username);
    } else {
      throw new AppError('e-mail or password incorrect', 401);
    }

    if (!user) throw new AppError('e-mail or password incorrect', 401);

    const isValid = await compare(password, user.password);
        
    if (!isValid) throw new AppError('e-mail or password incorrect', 401);

    const token = sign(
      {
        id: user.userId
      },
      process.env.SECRET,
      {
        expiresIn: process.env.EXPTIME
      }
    );

    return { token };
  }
}