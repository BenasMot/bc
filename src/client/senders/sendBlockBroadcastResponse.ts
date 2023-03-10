import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { BlockBroadcastResponseMessage } from '../message.ts';
import { sendMessage } from './sendMessage.ts';

export const sendBlockBroadcastResponse = async (
  socket: StandardWebSocketClient,
  verified: boolean,
  checkedBlockHash: string,
) => {
  const message: BlockBroadcastResponseMessage = {
    type: 'BLOCK_BROADCAST_RESPONSE',
    verified,
    checkedBlockHash,
  };
  await sendMessage(socket, message);
};
