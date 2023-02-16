import { Block } from '../../database/types/Block.ts';
import { Node } from '../../store/store.ts';
import { BlockShareMessage } from '../message.ts';
import { sendMessage } from "./sendMessage.ts";

export const sendBlockShare = async (node: Node, block: Block) => {
  const message: BlockShareMessage = {
    type: 'BLOCK_SHARE',
    block,
  };
  await sendMessage(node.socket, message);
  // TOOD send to all nodes
};
