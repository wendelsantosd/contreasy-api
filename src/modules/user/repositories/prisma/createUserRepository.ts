import { User } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

import { CreateUserDto } from '../../dtos/createUserDto';
import { ICreateUserRepository } from '../ICreateUserRepository';

export class CreateUserRepository implements ICreateUserRepository {
    
  async usernameExists(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (user) return true;

    return false;
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user) return true;

    return false;
  }

  async create({ name, email, username, password }: CreateUserDto): Promise<User> {

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password
      }
    });

    return user;
  }
}