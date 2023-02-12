import { crypto } from 'https://deno.land/std@0.172.0/crypto/crypto.ts';
import { encodeString } from '../encoding/encodeString.ts';

export const hashData = (data: string) => {
  const encodedData = encodeString(data);
  const hashBuffer = crypto.subtle.digestSync('SHA-256', encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
};
