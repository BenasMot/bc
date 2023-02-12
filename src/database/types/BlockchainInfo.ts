import { Block } from './Block.ts';

export interface BlockchainInfo {
  latestBlock: Block | undefined;
  pendingBlock: Block | undefined;
  chainLength: number;
  checkedBlockHashMap: { [hash: string]: boolean };
  verificationResponses: { [hash: string]: boolean[] };
}
