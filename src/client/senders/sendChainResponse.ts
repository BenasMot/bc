import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { ChainResponseMessage } from '../message.ts';

export const sendChainResponse = async (
  socket: StandardWebSocketClient,
  chainLength: number,
  lastBlockHash: string,
) => {
  const message: ChainResponseMessage = {
    type: 'CHAIN_RESPONSE',
    chainLength,
    lastBlockHash,
  };
  await socket.send(JSON.stringify(message));
};
