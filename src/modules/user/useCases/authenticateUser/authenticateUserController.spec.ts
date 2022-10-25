/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    await request(app)
      .post('/user/create')
      .send({
        name: 'user 1',
        email: 'user1@provider.com',
        username: 'user1',
        password: 'user1'
      });
  });

  it ('should be able to authenticate a user with e-mail', async () => {
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        email: 'user1@provider.com',
        password: 'user1'
      });

    expect(response.status).toBe(200);
  });

  it ('should be able to authenticate a user with username', async () => {
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        username: 'user1',
        password: 'user1'
      });

    expect(response.status).toBe(200);
  });

  it ('should not be able to authenticate a user with wrong e-mail', async () => {
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        email: 'wronguser1@provider.com',
        password: 'user1'
      });

    expect(response.status).toBe(401);
  });

  it ('should not be able to authenticate a user with wrong username', async () => {
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        email: 'wronguser1',
        password: 'user1'
      });

    expect(response.status).toBe(401);
  });

  it ('should not be able to authenticate a user with wrong password', async () => {
    const response = await request(app)
      .post('/user/authenticate')
      .send({
        email: 'wronguser1@provider.com',
        password: 'wronguser1'
      });

    expect(response.status).toBe(401);
  });
});