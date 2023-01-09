import { hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User } from '@prisma/client';
import { TypeUserEnum } from '@shared/utils/enum/TypeUserEnum';

import { IAuthenticateUserRepository } from '../IAuthenticateUserRepository';

export class AuthenticateUserRepositoryInMemory implements IAuthenticateUserRepository {
  private users: User[]  = [
    {
      userId: uuidv4(),
      name: 'User Name',
      username: 'userusername',
      email: 'user@provider.com',
      password: hashSync('userpassword', 8),
      access_level: TypeUserEnum.normal,
      phone: '99999999999',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: uuidv4(),
      name: 'User Name 2',
      username: 'userusername2',
      email: 'user2@provider.com',
      password: hashSync('userpassword2', 8),
      access_level: TypeUserEnum.normal,
      phone: '99999999992',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ];

  async findEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async findUsername(username: string): Promise<User> {
    const user = this.users.find(user => user.username === username);
    return user;
  }
}