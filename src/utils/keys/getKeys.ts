import { env } from '../../../env.ts';
import { parsePrivateKey, parsePublicKey } from '../encryption/encryption.ts';

export const getKeys = async (): Promise<CryptoKeyPair> => {
  const privateKeyString = env.PRIVATE_KEY;
  const publicKeyString = env.PUBLIC_KEY;

  const hasKeysInEnv = !!privateKeyString && !!publicKeyString;

  if (!hasKeysInEnv) {
    throw Error('No keys provided');
  }

  return {
    privateKey: await parsePrivateKey(privateKeyString),
    publicKey: await parsePublicKey(publicKeyString),
  };
};
