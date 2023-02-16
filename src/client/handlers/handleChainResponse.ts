import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { store } from '../../store/store.ts';
import { ChainResponseMessage } from '../message.ts';

export const handleChainResponse = (
  message: ChainResponseMessage,
  socket: StandardWebSocketClient,
) => {
  const { lastBlockHash, chainLength } = message;
  store.addChainLengthResponse({ lastBlockHash, chainLength}, socket);
};
