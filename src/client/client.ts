import { WebSocketServer } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { createBlock, createGenesisBlock, isEmptyChain } from '../blockchain/blocks.ts';
import { getMeasurements } from '../measurements/getMeasurements.ts';
import { store } from '../store/store.ts';
import { handleConnection } from './handlers/handleConnection.ts';
import { addBlockToChain } from './utils/addBlockToChain.ts';
import { announceBlock } from './utils/announceBlock.ts';
import { connectToNode } from './utils/connectToNode.ts';
import { updateChain } from './utils/updateChain.ts';

export const startClient = async (peers: string[]) => {
  const server = new WebSocketServer(store.getPort());
  console.log('# Listening on port ', store.getPort());
  server.addListener('connection', handleConnection);

  peers.forEach(connectToNode);

  await updateChain();
  if (isEmptyChain()) {
    addBlockToChain(await createGenesisBlock({}));
  }

  const intervalId = setInterval(loop, 15000);
  store.setAppLoopId(intervalId);
};

const loop = async () => {
  // TODO add measurements to database
  const measurements = await getMeasurements();
  const publicKey = store.getPublicKeyString();
  const previousHash = store.getLatestBlock()!.hash;
  const nextBlockChainNumber = store.getBlockchainLength() + 1;
  const block = await createBlock({ measurements }, previousHash, publicKey, nextBlockChainNumber);

  store.setPendingBlock(block);
  await announceBlock(block);
};
