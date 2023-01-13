import { AuthenticateUserDto } from '@modules/user/dtos/authenticateUserDto';
import { IAuthenticateUserRepository } from '@modules/user/repositories/IAuthenticateUserRepository';
import { AuthenticateUserRepositoryInMemory } from '@modules/user/repositories/inMemory/authenticateUserRepositoryInMemory';
import { AppError } from '@shared/errors/appErrors';
import { EncryptionProvider } from '@shared/providers/encryption/encryption';
import { IEncryptionProvider } from '@shared/providers/encryption/IEncryption';

import { AuthenticateUserService } from './authenticateUserService';


describe('Authenticate User', () => {
  let authenticateUserRepository: IAuthenticateUserRepository;
  let authenticateUserService: AuthenticateUserService;
  let encryptionProvider: IEncryptionProvider;

  beforeAll(() => {
    authenticateUserRepository = new AuthenticateUserRepositoryInMemory();
    encryptionProvider = new EncryptionProvider();
    authenticateUserService = new AuthenticateUserService(authenticateUserRepository, encryptionProvider);
  });

  it('should be able to authenticate using username', async () => {
    const credentials: AuthenticateUserDto = {
      username: 'userusername',
      password: 'userpassword'
    };

    const response = await authenticateUserService.execute(credentials);

    expect(response).toHaveProperty('token');
  });

  it('should be able to authenticate using e-mail', async () => {
    const credentials: AuthenticateUserDto = {
      email: 'user@provider.com',
      password: 'userpassword'
    };

    const response = await authenticateUserService.execute(credentials);

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate using wrong username', async () => {
    const credentials: AuthenticateUserDto = {
      username: 'wrong23726',
      password: 'userpassword'
    };

    await expect(authenticateUserService.execute(credentials))
      .rejects.toEqual(new AppError('e-mail or password incorrect', 401));
  });

  it('should not be able to authenticate using wrong email', async () => {
    const credentials: AuthenticateUserDto = {
      email: 'wrong2837@provider.com',
      password: 'userpassword'
    };

    await expect(authenticateUserService.execute(credentials))
      .rejects.toEqual(new AppError('e-mail or password incorrect', 401));
  });

  it('should not be able to authenticate using wrong password', async () => {
    const credentials: AuthenticateUserDto = {
      email: 'user@provider.com',
      password: 'wrong@37@15'
    };

    await expect(authenticateUserService.execute(credentials))
      .rejects.toEqual(new AppError('e-mail or password incorrect', 401));
  });
});