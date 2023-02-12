import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { store } from '../../store/store.ts';
import { sendChainResponse } from '../senders/sendChainResponse.ts';

export const handleChainRequest = async (socket: StandardWebSocketClient) => {
  const chainLength = store.getBlockchainLength();
  const lastBlockHash = store.getLatestBlock()?.hash;

  if (chainLength > 0 && lastBlockHash) {
    await sendChainResponse(socket, chainLength, lastBlockHash);
  }
};
