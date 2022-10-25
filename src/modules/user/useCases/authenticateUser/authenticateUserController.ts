import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from './authenticateUserService';


export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { token } = await authenticateUserService.execute({
      username,
      email,
      password
    });

    return response.status(200).json({
      message: 'user successfully authenticated',
      token
    });
  }
}