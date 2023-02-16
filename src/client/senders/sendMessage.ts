import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { logMessage } from '../../utils/log/logMessage.ts';
import { Message } from '../message.ts';

export const sendMessage = async (socket: StandardWebSocketClient, message: Message) => {
  logMessage(message, 'SENDING');
  await socket.send(JSON.stringify(message));
};
