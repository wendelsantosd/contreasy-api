import { User } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

import { IAuthenticateUserRepository } from '../IAuthenticateUserRepository';


export class AuthenticateUserRepository implements IAuthenticateUserRepository {
  async findUsername(username: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    return user;
  }

  async findEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return user;
  }
}