import { User } from '@prisma/client';

import { CreateUserDto } from '../dtos/createUserDto';


export interface ICreateUserRepository {
    create({ name, email, username, password }: CreateUserDto): Promise<User>;
    usernameExists(username: string): Promise<boolean>;
    emailExists(email: string): Promise<boolean>;
}