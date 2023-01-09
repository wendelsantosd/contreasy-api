import Joi from 'joi';

import { AuthenticateUserDto } from '@modules/user/dtos/authenticateUserDto';
import { CreateUserDto } from '@modules/user/dtos/createUserDto';
import { Domain } from '@shared/utils/domain';

import { Validator } from '../../middlewares/validator';

export class Schema extends Validator {
  static get create() {
    const schema = {
      body: Joi.object<CreateUserDto>({
        name: Joi.string().max(Domain.highDescription).required(),
        username: Joi.string().max(Domain.lowDescription).required(),
        email: Joi.string().max(Domain.lowDescription).required(),
        password: Joi.string().max(Domain.highDescription).required(),
      })
    };

    return this.validate(schema);
  }

  static get authenticate() {
    const schema = {
      body: Joi.object<AuthenticateUserDto>({
        username: Joi.string().max(Domain.minDescription).optional().allow(null),
        email: Joi.string().max(Domain.lowDescription).optional().allow(null),
        password: Joi.string().max(Domain.maxDescription).required()
      })
    };

    return this.validate(schema);
  }
}