import { compare, hash } from 'bcrypt';

import { IEncryptionProvider } from './IBcrypt';

export class BcryptProvider implements IEncryptionProvider {
  public async generateHash(data: string | Buffer): Promise<string> {
    return hash(data, 8);
  }
  
  public async compareHash(data: string | Buffer, hashed: string): Promise<boolean> {
    return await compare(data, hashed);  
  }
}