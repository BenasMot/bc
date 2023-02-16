import { Block } from '../../database/types/Block.ts';
import { store } from '../../store/store.ts';
import { sendBlockBroadcastRequest } from '../senders/sendBlockBroadcastRequest.ts';

export const announceBlock = async (block: Block) => {
  console.log('### Announcing block', block);
  const nodes = store.getNodes();
  await Promise.all(nodes.map((node) => sendBlockBroadcastRequest(node, block)));
};
