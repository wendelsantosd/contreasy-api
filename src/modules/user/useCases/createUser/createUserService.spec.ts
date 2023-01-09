import { AppError } from '@shared/errors/appErrors';
import { EncryptionProvider } from '@shared/providers/encryption/encryption';
import { IEncryptionProvider } from '@shared/providers/encryption/IEncryption';

import { CreateUserDto } from '../../dtos/createUserDto';
import { ICreateUserRepository } from '../../repositories/ICreateUserRepository';
import { CreateUserRepositoryInMemory } from '../../repositories/inMemory/createUserRepositoryInMemory';
import { CreateUserService } from './createUserService';

describe('Create user', () => {
  let userCreateRepository: ICreateUserRepository;
  let encryptionProvider: IEncryptionProvider;
  let createUserService: CreateUserService;

  beforeAll(() => {
    userCreateRepository = new CreateUserRepositoryInMemory();
    encryptionProvider = new EncryptionProvider();
    createUserService = new CreateUserService(userCreateRepository, encryptionProvider);
  });

  it('should be able to create a new user', async () => {
    const userData: CreateUserDto = {
      name: 'User Test',
      username: 'usertest',
      email: 'usertest@provider.com',
      password: 'usertestpassword',
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty('userId');
  });


  it('should not be able to create a new user with equal email', async () => {
    await createUserService.execute({
      name: 'User 1',
      email: 'user1@provider.com',
      username: 'user1',
      password: 'userpassword1',
    });

    await expect(
      createUserService.execute({
        name: 'User 2',
        email: 'user1@provider.com',
        username: 'user2',
        password: 'userpassword2',
      })
    ).rejects.toEqual(new AppError('email already exists', 409));
  });

  it('should not be able to create a new user with equal username', async () => {
    await createUserService.execute({
      name: 'User 3',
      email: 'user3@provider.com',
      username: 'user3',
      password: 'userpassword3',
    });

    await expect(
      createUserService.execute({
        name: 'User 4',
        email: 'user4@provider.com',
        username: 'user3',
        password: 'userpassword4',
      })
    ).rejects.toEqual(new AppError('username already exists', 409));
  });

  it('should not be able to create a new user with invalid email', async () => {
    await expect(
      createUserService.execute({
        name: 'User 5',
        email: 'invalidemail.com',
        username: 'user5',
        password: 'userpassword5'
      })
    ).rejects.toEqual(new AppError('invalid email format', 400));
  });

  it('should not be able to create a new user with password less than 6 characters', async () => {
    await expect(
      createUserService.execute({
        name: 'User 6',
        email: 'user6@provider.com',
        username: 'user6',
        password: 'less'
      })
    ).rejects.toEqual(new AppError('password must be 6 or more characters', 400));
  });

  it('should not be able to create a new user with username less than 2 characters', async () => {
    await expect(
      createUserService.execute({
        name: 'User 7',
        email: 'user7@provider.com',
        username: '7',
        password: 'userpassword7'
      })
    ).rejects.toEqual(new AppError('username must be 2 or more characters', 400));
  });
});