import { Block } from '../../database/types/Block.ts';
import { Node } from '../../store/store.ts';
import { BlockShareMessage } from '../message.ts';

export const sendBlockShare = async (node: Node, block: Block) => {
  const message: BlockShareMessage = {
    type: 'BLOCK_SHARE',
    block,
  };
  await node.socket.send(JSON.stringify(message));
  // TOOD send to all nodes
};
