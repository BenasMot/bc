import { BlockResponseMessage } from '../message.ts';
import { addBlockToChain } from '../utils/addBlockToChain.ts';

export const handleBlockResponse = async (message: BlockResponseMessage) => {
  const { block } = message;
  await addBlockToChain(block);
};
