import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { store } from '../../store/store.ts';
import { handleConnection } from '../handlers/handleConnection.ts';
import { sendHandshake } from '../senders/sendHandshake.ts';
import { nodeToAddress } from './nodeToAddress.ts';

export const connectToNode = (address: string) => {
  if (!isConnectable(address)) {
    return;
  }

  const socket = new StandardWebSocketClient(address);

  socket.addListener('open', () => {
    sendHandshake(socket);
    store.addNode({ address, socket });
  });

  socket.addListener('message', () => handleConnection(socket));

  socket.addListener('close', () => {
    store.removeNode(address);
  });

  socket.addListener('error', (err: unknown) => console.error(err));
};

const isConnectable = (address: string) => {
  const connectedNodeAddresses = store.getNodes().map(nodeToAddress);
  const isConnected = connectedNodeAddresses.includes(address);
  const notSelf = address !== store.getIdentity().address;
  const underNodeLimit = store.getNodes().length < store.getMaxPeers();

  reportConnectionError({
    isConnected,
    isSelf: !notSelf,
    maxPeers: !underNodeLimit,
    address,
  });

  return !isConnected && notSelf && underNodeLimit;
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
