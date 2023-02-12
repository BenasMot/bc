import { Node } from '../../store/store.ts';
import { ChainRequestMessage } from '../message.ts';

export const sendChainRequest = async (node: Node) => {
  const message: ChainRequestMessage = {
    type: 'CHAIN_REQUEST',
  };
  await node.socket.send(JSON.stringify(message));
};
