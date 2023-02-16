import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { store } from '../../store/store.ts';
import { HandhakeMessage } from '../message.ts';
import { nodeToAddress } from '../utils/nodeToAddress.ts';
import { sendMessage } from './sendMessage.ts';

export const sendHandshake = async (socket: StandardWebSocketClient) => {
  const message: HandhakeMessage = {
    type: 'HANDSHAKE',
    nodes: [...store.getNodes().map(nodeToAddress), store.getIdentity().address],
  };
  await sendMessage(socket, message);
};
