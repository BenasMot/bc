import { Block } from '../../database/types/Block.ts';
import { Node } from '../../store/store.ts';
import { Message } from '../message.ts';
import { sendMessage } from "./sendMessage.ts";

export const sendBlockBroadcastRequest = async (node: Node, block: Block) => {
  const message: Message = {
    type: 'BLOCK_BROADCAST_REQUEST',
    block,
  };
  await sendMessage(node.socket, message);
};
