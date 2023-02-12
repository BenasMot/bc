export interface Block {
  chainNumber: number;
  previousBlockHash: string;
  data: string;
  publicKey: string;
  nonce: number;
  hash: string;
  timestamp: number;
  signature: string;
}
