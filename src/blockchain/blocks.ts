import { db } from '../database/actions.ts';
import { Block } from '../database/types/Block.ts';
import { store } from '../store/store.ts';
import { createSignature } from '../utils/encryption/encryption.ts';
import { hashData } from '../utils/hashing/hash.ts';

export const createGenesisBlock = async (
  data: Record<string, unknown>,
): Promise<Block> => {
  const blockBase = {
    data: JSON.stringify(data),
    publicKey: store.getPublicKeyString(),
    previousBlockHash: '',
    chainNumber: 0,
  };
  const mintedPart = mineBlock(blockBase);
  const mintedBlock = { ...blockBase, ...mintedPart };
  const signature = await createSignature(JSON.stringify(mintedBlock));

  return { ...mintedBlock, signature };
};

export const createBlock = async (
  data: Record<string, unknown>,
  previousHash: string,
  publicKey: string,
  chainNumber: number,
): Promise<Block> => {
  const blockBase = {
    data: JSON.stringify(data),
    previousBlockHash: previousHash,
    chainNumber,
    publicKey,
  };

  const mintedPart = mineBlock(blockBase);
  const mintedBlock = { ...blockBase, ...mintedPart };
  const signature = await createSignature(JSON.stringify(mintedBlock));

  return { ...mintedBlock, signature };
};

const mineBlock = (
  blockBase: Pick<Block, 'data' | 'publicKey' | 'previousBlockHash'>,
): Pick<Block, 'hash' | 'nonce' | 'timestamp'> => {
  const difficulty = 2;

  let mined = false;
  let nonce = 0;
  let hash = '';
  while (!mined) {
    const blockWithNonce = { ...blockBase, nonce };
    const dataString = JSON.stringify(blockWithNonce);
    hash = hashData(dataString);

    if (startsWithZeros(hash, difficulty)) {
      mined = true;
    } else {
      nonce++;
    }
  }

  return {
    nonce,
    hash,
    timestamp: Date.now(),
  };
};

const startsWithZeros = (str: string, n: number) => {
  return str.slice(0, n).split('').every((s) => s === '0');
};

export const isEmptyChain = ():boolean => {
  return db.getSavedChainLength() === 0;
};