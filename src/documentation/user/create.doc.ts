export const create = {
  '/user/create': {
    post: {
      tags: ['User'],
      summary: 'User create',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                username: {
                  type: 'string'
                },
                password: {
                  type: 'string'
                }
              },
              example: {
                name: 'Ben',
                email: 'ben@provider.com',
                username: 'ben01',
                password: 'benpasscrip'
              }
            }
          }
        }
      },
      responses: {
        '201': {
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: {
                  message:'user created'
                }
              }
            }
          }
        },
        '400': {
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: {
                  message: [
                    'invalid email format',
                    'password must be 6 or more characters',
                    'username must be 2 or more characters'
                  ]
                }
              }
            }
          }
        },
        '409': {
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: {
                  message:[
                    'email already exists',
                    'username already exists',
                  ]
                }
              }
            }
          }
        },
        '500': {
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: {
                  message:'<<error message>>'
                }
              }
            }
          }
        }
      }
    }
  }
};