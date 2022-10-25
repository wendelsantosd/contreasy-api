import { User } from '@prisma/client';

export interface IAuthenticateUserRepository {
    findUsername(username: string): Promise<User>,
    findEmail(email: string): Promise<User>,
}