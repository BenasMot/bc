import { Block } from '../../database/types/Block.ts';
import { Node } from '../../store/store.ts';
import { Message } from '../message.ts';

export const sendBlockBroadcastRequest = async (node: Node, block: Block) => {
  const message: Message = {
    type: 'BLOCK_BROADCAST_REQUEST',
    block,
  };
  await node.socket.send(JSON.stringify(message));
};
