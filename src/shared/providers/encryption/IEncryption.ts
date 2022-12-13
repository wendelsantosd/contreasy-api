export interface IEncryptionProvider {
  generateHash(data: string | Buffer): Promise<string>;
  compareHash(data: string | Buffer, hashed: string): Promise<boolean>;
}