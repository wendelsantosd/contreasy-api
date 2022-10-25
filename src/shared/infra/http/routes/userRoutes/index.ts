import { Router } from 'express';

import { AuthenticateUserController } from '@modules/user/useCases/authenticateUser/authenticateUserController';
import { CreateUserController } from '@modules/user/useCases/createUser/createUserController';

import { Schema } from './schema';

export const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post('/user/create', Schema.create, createUserController.handle);
userRoutes.post('/user/authenticate', Schema.authenticate, authenticateUserController.handle);

