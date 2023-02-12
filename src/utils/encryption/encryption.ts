import { crypto } from 'https://deno.land/std@0.172.0/crypto/mod.ts';
import {
  decode as hexDecode,
  encode as hexEncode,
} from 'https://deno.land/std@0.172.0/encoding/hex.ts';

import { encodeString } from '../encoding/encodeString.ts';
import { decodeString } from '../encoding/decodeString.ts';

const SIGN_ALGORHITM = 'ECDSA' as const;
const CURVE = 'P-384' as const;
const HASH_FUNC = 'SHA-384' as const;

let keys: CryptoKeyPair | undefined;

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected keys to be defined, but received ${val}`,
    );
  }
}

export const generateKeys = async () => {
  keys = await crypto.subtle.generateKey(
    {
      name: SIGN_ALGORHITM,
      namedCurve: CURVE,
    },
    true,
    ['sign', 'verify'],
  );
};

const exportKey = async (type: 'public' | 'private') => {
  assertIsDefined(keys);

  const method = type === 'public' ? 'spki' : 'pkcs8';
  const key = type === 'public' ? keys.publicKey : keys.privateKey;
  const keyBuffer = await crypto.subtle.exportKey(method, key);
  const keyArray = new Uint8Array(keyBuffer);
  const keyHex = hexEncode(keyArray);
  const keyString = decodeString(keyHex);

  return keyString;
};

const parseKey = async (keyStr: string, type: 'public' | 'private') => {
  const method = type === 'public' ? 'spki' : 'pkcs8';
  const keyUsage = type === 'public' ? 'verify' : 'sign';
  const keyHex = encodeString(keyStr);
  const keyArray = hexDecode(keyHex);

  const key = await crypto.subtle.importKey(
    method,
    keyArray,
    { name: SIGN_ALGORHITM, namedCurve: CURVE },
    true,
    [keyUsage],
  );

  return key;
};

export const importKeys = (keyPair: CryptoKeyPair) => {
  keys = keyPair;
};

export const exportPublicKey = async () => await exportKey('public');
export const exportPrivateKey = async () => await exportKey('private');
export const parsePublicKey = async (keyStr: string) => await parseKey(keyStr, 'public');
export const parsePrivateKey = async (keyStr: string) => await parseKey(keyStr, 'private');

export const createSignature = async (data: string) => {
  assertIsDefined(keys);

  const dataArray = encodeString(data);
  const signatureBuffer = await crypto.subtle.sign(
    { name: SIGN_ALGORHITM, hash: { name: HASH_FUNC } },
    keys.privateKey,
    dataArray,
  );
  const signatureArray = new Uint8Array(signatureBuffer);
  const signatureHex = hexEncode(signatureArray);
  const signatureString = decodeString(signatureHex);

  return signatureString;
};

export const verifySignature = async (
  verificationKey: string,
  signature: string,
  signedData: string,
) => {
  assertIsDefined(keys);

  const signatureHex = encodeString(signature);
  const signatureArray = hexDecode(signatureHex);
  const verificationCryptoKey = await parsePublicKey(verificationKey);
  const dataBuffer = encodeString(signedData);

  const verified = await crypto.subtle.verify(
    { name: SIGN_ALGORHITM, hash: { name: HASH_FUNC } },
    verificationCryptoKey,
    signatureArray,
    dataBuffer,
  );

  return verified;
};
