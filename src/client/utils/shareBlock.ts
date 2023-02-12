import { Block } from '../../database/types/Block.ts';
import { store } from '../../store/store.ts';
import { sendBlockShare } from '../senders/sendBlockShare.ts';

export const shareBlock = async (block: Block) => {
  const nodes = store.getNodes();
  await Promise.all(nodes.map((node) => sendBlockShare(node, block)));
};
