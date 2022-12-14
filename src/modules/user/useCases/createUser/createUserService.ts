
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/appErrors';
import { validateEmail, validatePassword, validateUsername } from '@shared/helpers/validator.helper';
import { IEncryptionProvider } from '@shared/providers/encryption/IEncryption';

import { ICreateUserRepository } from '../../repositories/ICreateUserRepository';

interface IRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}
@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CreateUserService {
  constructor(
        @inject('CreateUserRepository')
        private readonly createUserRepository: ICreateUserRepository,
        @inject('EncryptionProvider')
        private readonly encryptionProvider: IEncryptionProvider
  ) { }

  async execute({ name, username, email, password }: IRequest) {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) throw new AppError('invalid email format', 400);

    const isValidPassword = validatePassword(password);

    if (!isValidPassword) throw new AppError('password must be 6 or more characters', 400);

    const isValidUsername = validateUsername(username);

    if (!isValidUsername) throw new AppError('username must be 2 or more characters', 400);

    const emailExists = await this.createUserRepository.emailExists(email);

    if (emailExists) throw new AppError('email already exists', 409);

    const usernameExists = await this.createUserRepository.usernameExists(username);

    if (usernameExists) throw new AppError('username already exists', 409);

    const hashedPassword = await this.encryptionProvider.generateHash(password);

    const user = await this.createUserRepository.create({
      name,
      username,
      email,
      password: hashedPassword
    }); 
        
    return user;
  }
}