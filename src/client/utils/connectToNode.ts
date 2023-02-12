import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { store } from '../../store/store.ts';
import { Message } from '../message.ts';
import { nodeToAddress } from './nodeToAddress.ts';

export const connectToNode = (address: string) => {
  if (!isConnectable(address)) {
    return;
  }

  const socket = new StandardWebSocketClient(address);

  socket.on('open', () => {
    const message: Message = {
      type: 'HANDSHAKE',
      nodes: store.getNodes().map(nodeToAddress),
    };
    socket.send(JSON.stringify(message));
    store.addNode({ address, socket });
  });

  socket.on('close', () => {
    store.removeNode(address);
  });
};

const isConnectable = (address: string) => {
  const connectedNodeAddresses = store.getNodes().map(nodeToAddress);
  const notConnected = connectedNodeAddresses.includes(address);
  const notSelf = address !== store.getIdentity().address;
  const underNodeLimit = store.getNodes().length < store.getMaxPeers();

  reportConnectionError({
    isConnected: !notConnected,
    isSelf: !notSelf,
    maxPeers: !underNodeLimit,
    address,
  });

  return notConnected && notSelf && underNodeLimit;
};

const reportConnectionError = (
  { isConnected, isSelf, maxPeers, address }: {
    isConnected: boolean;
    isSelf: boolean;
    maxPeers: boolean;
    address: string;
  },
) => {
  isConnected &&
    console.error(`Connection error: already connected to ${address}`);
  isSelf &&
    console.error('Connection error: cannot connect to self');
  maxPeers &&
    console.error(
      `Connection error: max peer limit reached (${store.getMaxPeers()})`,
    );
};
