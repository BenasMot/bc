import { Node } from '../../store/store.ts';
import { ChainRequestMessage } from '../message.ts';
import { sendMessage } from './sendMessage.ts';

export const sendChainRequest = async (node: Node) => {
  const message: ChainRequestMessage = {
    type: 'CHAIN_REQUEST',
  };
  await sendMessage(node.socket, message);
};
