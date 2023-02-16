import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { BlockBroadcastResponseMessage } from '../message.ts';

export const sendBlockBroadcastResponse = async (
  socket: StandardWebSocketClient,
  verified: boolean,
  checkedBlockHash: string,
) => {
  console.log('### Sending Block Broadcast Response', { verified });
  const message: BlockBroadcastResponseMessage = {
    type: 'BLOCK_BROADCAST_RESPONSE',
    verified,
    checkedBlockHash,
  };
  await socket.send(JSON.stringify(message));
};
