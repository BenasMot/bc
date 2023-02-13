import { store } from './src/store/store.ts';
import { env } from './env.ts';
import { startClient } from './src/client/client.ts';
import { getKeys } from './src/utils/keys/getKeys.ts';
import { initDatabase } from './src/database/database.ts';
import { importKeys } from './src/utils/encryption/encryption.ts';
import { db } from './src/database/actions.ts';

if (!env.PRIVATE_KEY || !env.PUBLIC_KEY) {
  throw Error('No keys provided');
}

store.setIdentity({
  port: Number(env.PORT) || 3000,
  address: env.ADDRESS || 'ws://localhost:3000',
  name: env.NAME || 'Lab Equipment 1',
});

store.setOptions({
  maxPeers: Number(env.MAX_PEERS) || 30,
});

store.setKeyStrings({
  privateKey: env.PRIVATE_KEY,
  publicKey: env.PUBLIC_KEY,
});

store.setKeys(await getKeys());
importKeys(store.getKeys()!);

initDatabase();

const chainLength = db.getSavedChainLength();
const latestBlock = db.getBlockFromChain(chainLength - 1);
store.setBlockchain({
  chainLength,
  latestBlock,
  checkedBlockHashMap: {},
  verificationResponses: {},
  pendingBlock: undefined,
});

const peers = env.PEERS?.split(',');
await startClient(peers || []);
