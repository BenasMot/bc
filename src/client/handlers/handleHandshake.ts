import { store } from '../../store/store.ts';
import { HandhakeMessage } from '../message.ts';
import { connectToNode } from '../utils/connectToNode.ts';
import { nodeToAddress } from '../utils/nodeToAddress.ts';

export const handleHandshake = (message: HandhakeMessage) => {
  const nodes = message.nodes;
  const notConnectedNodes = nodes.filter((nodeAddress) =>
    !store.getNodes().map(nodeToAddress).includes(nodeAddress)
  );
  notConnectedNodes.forEach(connectToNode);
};
