import { version, description } from '../../package.json';
import { userDocs } from './user';

export const swagger  = {
  openapi: '3.0.3',
  info: {
    title: 'Bancaview API',
    description,
    version,
    contact: {
      email: 'wendelwcsantos@gmail.com'
    }
  },
  paths: {
    ...userDocs
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};