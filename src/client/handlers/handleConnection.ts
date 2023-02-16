import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { handleHandshake } from './handleHandshake.ts';
import { Message } from '../message.ts';
import { handleBlockBroadcastRequest } from './handleBlockBroadcastRequest.ts';
import { handleBlockBroadcastResponse } from './handleBlockBroadcastResponse.ts';
import { handleBlockShare } from './handleBlockShare.ts';
import { handleChainRequest } from './handleChainRequest.ts';
import { handleChainResponse } from './handleChainResponse.ts';
import { handleBlockRequest } from './handleBlockRequest.ts';
import { handleBlockResponse } from './handleBlockResponse.ts';
import { logMessage } from '../../utils/log/logMessage.ts';

export const handleConnection = (socket: StandardWebSocketClient) => {
  socket.addListener('message', (messageObj: string | MessageEvent<string>) => {
    const message = parseMessage(messageObj);
    logMessage(message, 'RECEIVED', socket.webSocket?.url);

    switch (message.type) {
      case 'HANDSHAKE': {
        // register with all nodes
        handleHandshake(message);
        break;
      }

      case 'CHAIN_REQUEST': {
        // get chain from store and send to request address
        handleChainRequest(socket);
        break;
      }

      case 'CHAIN_RESPONSE': {
        // place repsonse in store
        handleChainResponse(message, socket);
        break;
      }

      case 'BLOCK_REQUEST': {
        // send block
        handleBlockRequest(message, socket);
        break;
      }

      case 'BLOCK_RESPONSE': {
        // put block in local chain
        handleBlockResponse(message);
        break;
      }

      case 'BLOCK_BROADCAST_REQUEST': {
        // verify and send response
        handleBlockBroadcastRequest(message, socket);
        break;
      }

      case 'BLOCK_BROADCAST_RESPONSE': {
        // register response and add or dismiss block
        handleBlockBroadcastResponse(message);
        break;
      }

      case 'BLOCK_SHARE': {
        // check if had verified and add to chain
        handleBlockShare(message);
        break;
      }

      default:
        break;
    }
  });

  socket.addListener('error', () => {
    console.log('@@@ handleConnection error in socket', socket.webSocket?.url);
  });

  socket.addListener('close', () => {
    console.log('@@@ handleConnection closed socket', socket.webSocket?.url);
  });
};

const parseMessage = (messageObj: string | MessageEvent<string>): Message => {
  return typeof messageObj === 'string' ? JSON.parse(messageObj) : JSON.parse(messageObj.data);
};
