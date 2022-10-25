import 'reflect-metadata';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { serve, setup} from 'swagger-ui-express';

import { swagger } from '@documentation/index';

import { AppError } from '../../errors/appErrors';
import { router } from './routes';

import '../../container';

config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(router);
app.use('/', serve, setup(swagger));

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message
      });
    }

    return res.status(500).json({
      statusCode: 500,
      message: `${err.message}`,
    });
  }
);

export { app };
