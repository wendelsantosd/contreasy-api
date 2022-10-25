import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

interface IValidator {
    params?: Joi.Schema;
    query?: Joi.Schema;
    body?: Joi.Schema;
}

interface IErrors {
    type: string;
    error: { 
        [key: string]: any
    }
}

export class Validator {
  static schema: IValidator;

  static validate(schema: IValidator) {
    return this.makeValidation.bind(schema);
  }

  static makeValidation(req: Request, res: Response, next: NextFunction) {
    const errors: IErrors[] = [];
    const schema = this;

    Object.keys(schema).map(k => {
      const { error } = schema[k].validate(req[k]);

      if (error) errors.push({ type: `${k} validation`, error });

      return k;
    });

    if (errors.length === 0) {
      return next();
    }

    return res.status(400).json({ 
      message: errors[0].error.details[0].message
    });
  }
}