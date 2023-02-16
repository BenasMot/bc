import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { db } from '../../database/actions.ts';
import { BlockRequestMessage } from '../message.ts';
import { sendBlockResponse } from '../senders/sendBlockResponse.ts';

export const handleBlockRequest = async (
  message: BlockRequestMessage,
  socket: StandardWebSocketClient,
) => {
  const { blockNumber } = message;
  const block = db.getBlockFromChain(blockNumber);

  if (block) {
    await sendBlockResponse(socket, block);
  }
};
