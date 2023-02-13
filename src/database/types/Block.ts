export interface Block extends Record<string, number | string> {
  chainNumber: number;
  previousBlockHash: string;
  data: string;
  publicKey: string;
  nonce: number;
  hash: string;
  timestamp: number;
  signature: string;
}

export const BLOCK_FIELDS = {
  chainNumber: 'chain_number',
  previousBlockHash: 'previous_block_hash',
  data: 'data',
  publicKey: 'public_key',
  nonce: 'nonce',
  hash: 'hash',
  timestamp: 'timestamp',
  signature: 'signature',
} as const;
