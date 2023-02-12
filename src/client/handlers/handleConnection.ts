import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { handleHandshake } from './handleHandshake.ts';
import { Message } from '../message.ts';
import { handleBlockBroadcastRequest } from './handleBlockBroadcastRequest.ts';
import { handleBlockBroadcastResponse } from './handleBlockBroadcastResponse.ts';
import { handleBlockShare } from './handleBlockShare.ts';
import { handleChainRequest } from './handleChainRequest.ts';
import { handleChainResponse } from './handleChainResponse.ts';
import { handleBlockRequest } from "./handleBlockRequest.ts";

export const handleConnection = (socket: StandardWebSocketClient) => {
  socket.on('message', (messageStr: string) => {
    const message: Message = JSON.parse(messageStr);

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
        // TODO set block
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
};
