import { Block } from '../../database/types/Block.ts';
import { store } from '../../store/store.ts';
import { sendBlockBroadcastRequest } from '../senders/sendBlockBroadcastRequest.ts';

export const announceBlock = async (block: Block) => {
  const nodes = store.getNodes();
  await Promise.all(nodes.map((node) => sendBlockBroadcastRequest(node, block)));
};
