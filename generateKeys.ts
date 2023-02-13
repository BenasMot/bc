import {
  exportPrivateKey,
  exportPublicKey,
  generateKeys,
} from './src/utils/encryption/encryption.ts';

await generateKeys();

const publicKey = await exportPublicKey();
const privateKey = await exportPrivateKey();

console.log('Successfully generated keys:\n');
console.log('- public key');
console.log(publicKey);
console.log('- private key');
console.log(privateKey);
