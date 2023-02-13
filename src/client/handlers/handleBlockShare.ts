import { store } from '../../store/store.ts';
import { BlockShareMessage } from '../message.ts';
import { addBlockToChain } from '../utils/addBlockToChain.ts';

export const handleBlockShare = (message: BlockShareMessage) => {
  const { block } = message;

  const blockIsVerified = store.getBlockVerificationStatus(block.hash);
  if (blockIsVerified) {
    addBlockToChain(block);
  }
};
