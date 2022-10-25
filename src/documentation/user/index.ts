import { authenticate } from './authenticate.doc';
import { create } from './create.doc';

export const userDocs = {
  ...create,
  ...authenticate
};