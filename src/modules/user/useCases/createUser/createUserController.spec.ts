/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create User Controller', () => {
  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'user 1',
        email: 'user1@provider.com',
        username: 'user1',
        password: 'user1'
      });
        
    expect(response.status).toBe(201);
  });

  it ('should not be able to create a new user with equal email', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'user 2',
        email: 'user1@provider.com',
        username: 'user2',
        password: 'user2'
      });

    expect(response.status).toBe(403);
  });

  it ('should not be able to create a new user with equal username', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'user 3',
        email: 'user3@provider.com',
        username: 'user1',
        password: 'user3'
      });

    expect(response.status).toBe(403);
  });
});