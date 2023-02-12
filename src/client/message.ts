import { Block } from '../database/types/Block.ts';
import { ChainLengthResponse } from '../store/store.ts';

export type HandhakeMessage = {
  type: 'HANDSHAKE';
  nodes: string[];
};

export type ChainRequestMessage = {
  type: 'CHAIN_REQUEST';
};

export type ChainResponseMessage = {
  type: 'CHAIN_RESPONSE';
} & ChainLengthResponse;

export type BlockShareMessage = {
  type: 'BLOCK_SHARE';
  block: Block;
};

export type BlockRequestMessage = {
  type: 'BLOCK_REQUEST';
  blockNumber: number;
};

export type BlockResponseMessage = {
  type: 'BLOCK_RESPONSE';
  block: Block;
};

export type BlockBroadcastRequestMessage = {
  type: 'BLOCK_BROADCAST_REQUEST';
  block: Block;
};

export type BlockBroadcastResponseMessage = {
  type: 'BLOCK_BROADCAST_RESPONSE';
  verified: boolean;
  checkedBlockHash: string;
};

export type Message =
  | HandhakeMessage
  | ChainRequestMessage
  | ChainResponseMessage
  | BlockShareMessage
  | BlockRequestMessage
  | BlockResponseMessage
  | BlockBroadcastRequestMessage
  | BlockBroadcastResponseMessage;
