export const authenticate = {
  '/user/authenticate': {
    post: {
      tags: ['User'],
      summary: 'User authenticate',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
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
                email: 'ben@provider.com',
                username: 'ben01',
                password: 'benpasscrip'
              }
            }
          }
        }
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: {
                  message: 'owner successfully authenticated',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3Yzk3YzlmLWViY2QtNGMyNy1iNjUwLWNlODVhMTAxNWRjYiIsImlhdCI6MTY2MzI4ODE2MSwiZXhwIjoxNjk0MzkyMTYxfQ.G2OThHRbhyd75iaUE152Ocgz6W478jBVjgr10F6QJcQ'
                }
              }
            }
          }
        },
        '401': {
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: {
                  message:'e-mail or password incorrect'
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