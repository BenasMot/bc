import { store } from '../../store/store.ts';
import { BlockBroadcastResponseMessage } from '../message.ts';
import { addBlockToChain } from '../utils/addBlockToChain.ts';
import { shareBlock } from '../utils/shareBlock.ts';
import { updateChain } from '../utils/updateChain.ts';

export const handleBlockBroadcastResponse = async (message: BlockBroadcastResponseMessage) => {
  console.log(
    '### Handling block response',
    message.checkedBlockHash === store.getPendingBlock()?.hash,
  );
  const { checkedBlockHash, verified } = message;
  assertIsPendingBlock(checkedBlockHash);

  store.addBlockVerificationResponse(checkedBlockHash, verified);
  const responses = store.getBlockVerificationResponses(checkedBlockHash);
  const verifiedCount = responses.filter(Boolean).length;
  const peerCount = store.getNodes().length;

  console.log('###', verifiedCount, peerCount);
  if (verifiedCount >= peerCount / 2) {
    const block = store.getPendingBlock()!;
    await shareBlock(block);
    addBlockToChain(block);
  } else {
    await updateChain();
  }
};

const assertIsPendingBlock = (hash: string) => {
  const pendingBlock = store.getPendingBlock();
  const isPendingBlock = hash === pendingBlock?.hash;
  if (!isPendingBlock) {
    console.error(`Got broadcast response not regarding the pending block. Hash: ${hash}`);
    return;
  }
};
