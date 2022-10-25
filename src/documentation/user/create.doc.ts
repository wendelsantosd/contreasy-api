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
                  message:'owner created'
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
                  message:'<<value>> already exists'
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