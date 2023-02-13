import { Block } from '../types/Block.ts';

export const aBlock = (overrides: Partial<Block> = {}): Block => {
  return {
    chainNumber: 0,
    previousBlockHash: '',
    data: '',
    publicKey: '',
    nonce: 1,
    hash: '',
    timestamp: 1,
    signature: '',
    ...overrides,
  };
};
