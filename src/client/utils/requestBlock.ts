import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { store } from '../../store/store.ts';
import { sleep } from '../../utils/other/sleep.ts';
import { sendBlockRequest } from '../senders/sendBlockRequest.ts';

export const requestBlock = async (socket: StandardWebSocketClient, blockNumber: number) => {
  let response = store.getBlockRequestMap().get(blockNumber);

  await sendBlockRequest(socket, blockNumber);

  let iteration = 0;
  if (!response && iteration < 10) {
    response = store.getBlockRequestMap().get(blockNumber);
    iteration++;
    await sleep(1000);
  }

  if (!response) {
    throw new Error('Failed getting block response');
  }

  return response;
};
