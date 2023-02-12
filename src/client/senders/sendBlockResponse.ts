import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { Block } from '../../database/types/Block.ts';
import { BlockResponseMessage } from '../message.ts';

export const sendBlockResponse = async (socket: StandardWebSocketClient, block: Block) => {
  const message: BlockResponseMessage = {
    type: 'BLOCK_RESPONSE',
    block,
  };
  await socket.send(JSON.stringify(message));
};
