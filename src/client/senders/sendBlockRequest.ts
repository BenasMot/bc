import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { BlockRequestMessage } from '../message.ts';
import { sendMessage } from "./sendMessage.ts";

export const sendBlockRequest = async (socket: StandardWebSocketClient, blockNumber: number) => {
  const message: BlockRequestMessage = {
    type: 'BLOCK_REQUEST',
    blockNumber,
  };
  await sendMessage(socket, message);
};
