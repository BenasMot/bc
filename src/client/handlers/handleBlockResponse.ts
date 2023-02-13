import { BlockResponseMessage } from '../message.ts';
import { addBlockToChain } from '../utils/addBlockToChain.ts';

export const handleBlockResponse = (message: BlockResponseMessage) => {
  const { block } = message;
  addBlockToChain(block);
};
