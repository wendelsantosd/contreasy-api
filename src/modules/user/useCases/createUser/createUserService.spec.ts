import { AppError } from '@shared/errors/appErrors';

import { CreateUserDto } from '../../dtos/createUserDto';
import { ICreateUserRepository } from '../../repositories/ICreateUserRepository';
import { CreateUserRepositoryInMemory } from '../../repositories/inMemory/createUserRepositoryInMemory';
import { CreateUserService } from './createUserService';

describe('Create user', () => {
  let userCreateRepository: ICreateUserRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    userCreateRepository = new CreateUserRepositoryInMemory();
    createUserService = new CreateUserService(userCreateRepository);
  });

  it('should be able to create a new user', async () => {
    const userData: CreateUserDto = {
      name: 'User Test',
      username: 'usertest',
      email: 'usertest@provider.com',
      password: 'user',
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty('userId');
  });


  it('should not be able to create a new user with equal email', async () => {
    await createUserService.execute({
      name: 'User 1',
      email: 'user1@provider.com',
      username: 'user1',
      password: 'user1',
    });

    await expect(
      createUserService.execute({
        name: 'User 2',
        email: 'user1@provider.com',
        username: 'user2',
        password: 'user2',
      })
    ).rejects.toEqual(new AppError('email already exists', 403));
  });

  it('should not be able to create a new user with equal username', async () => {
    await createUserService.execute({
      name: 'User 3',
      email: 'user3@provider.com',
      username: 'user3',
      password: 'user3',
    });

    await expect(
      createUserService.execute({
        name: 'User 4',
        email: 'user4@provider.com',
        username: 'user3',
        password: 'user4',
      })
    ).rejects.toEqual(new AppError('username already exists', 403));
  });
});