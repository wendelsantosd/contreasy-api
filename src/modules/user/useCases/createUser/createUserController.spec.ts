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
        username: 'user1',
        email: 'user1@provider.com',
        password: 'user1password'
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
        password: 'user2password'
      });

    expect(response.status).toBe(409);
  });

  it ('should not be able to create a new user with equal username', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'user 3',
        email: 'user3@provider.com',
        username: 'user1',
        password: 'user3password'
      });

    expect(response.status).toBe(409);
  });

  it('should not be able to create a new user with invalid email', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'user 4',
        email: 'user4invalidprovider.com',
        username: 'user4',
        password: 'user4password'
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new user with password less than 6 characters', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'user 5',
        email: 'user5@provider.com',
        username: 'user5',
        password: 'less'
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new user with username less than 2 characters', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        name: 'user 6',
        email: 'user6@provider.com',
        username: '6',
        password: 'user6password'
      });

    expect(response.status).toBe(400);
  });
});