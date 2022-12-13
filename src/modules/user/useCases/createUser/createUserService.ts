
import { hash } from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/appErrors';
import { IEncryptionProvider } from '@shared/providers/encryption/IEncryption';

import { ICreateUserRepository } from '../../repositories/ICreateUserRepository';

interface IRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
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