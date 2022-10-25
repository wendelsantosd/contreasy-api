import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from './createUserService';


export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      username,
      password
    } = request.body;
        
    const createUserService = container.resolve(CreateUserService);
        
    await createUserService.execute({
      name,
      email,
      username,
      password
    });

    return response.status(201).json({
      message: 'user created'
    });
  }
}