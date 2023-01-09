import { v4 as uuidv4 } from 'uuid';

import { User } from '@prisma/client';
import { TypeUserEnum } from '@shared/utils/enum/TypeUserEnum';

import { CreateUserDto } from '../../dtos/createUserDto';
import { ICreateUserRepository } from '../ICreateUserRepository';

export class CreateUserRepositoryInMemory implements ICreateUserRepository {
  private users: User[] = [];

  async usernameExists(username: string): Promise<boolean> {
    const user = this.users.find(user => user.username === username);

    if (user) return true;

    return false;
  }
    
  async emailExists(email: string): Promise<boolean> {
    const user = this.users.find(user => user.email === email);

    if (user) return true;

    return false;
  }

  async create({ name, email, username, password }: CreateUserDto): Promise<User> {
    const user: User = {
      userId: uuidv4(),
      name,
      email,
      username,
      password,
      phone: null,
      access_level: TypeUserEnum.normal,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
}