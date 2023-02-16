import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { Block } from '../database/types/Block.ts';
import { BlockchainInfo } from '../database/types/BlockchainInfo.ts';
import { reducers } from './reducers.ts';

interface Identity {
  address: string;
  port: number;
  name: string;
}
interface Options {
  maxPeers: number;
}
interface KeyStrings {
  privateKey: string;
  publicKey: string;
}

export interface Node {
  address: string;
  socket: StandardWebSocketClient;
}

export interface ChainLengthResponse {
  chainLength: number;
  lastBlockHash: string;
}

export type ChainLengthResponses = {
  response: ChainLengthResponse;
  socket: StandardWebSocketClient;
}[];

interface Store {
  keys: CryptoKeyPair | undefined;
  keyStrings: KeyStrings;
  identity: Identity;
  options: Options;
  nodes: Node[];
  chain: BlockchainInfo;
  chainLengthResponses: ChainLengthResponses;
  blockRequestMap: Map<number, Block>;
  appLoopId: number;
}

const _store: Store = {
  keys: undefined,
  keyStrings: { privateKey: '', publicKey: '' },
  identity: { address: '', port: 0, name: '' },
  options: { maxPeers: 0 },
  nodes: [],
  chain: {
    chainLength: 0,
    checkedBlockHashMap: {},
    latestBlock: undefined,
    pendingBlock: undefined,
    verificationResponses: {},
  },
  chainLengthResponses: [],
  blockRequestMap: new Map(),
  appLoopId: 0,
};

const getters = {
  getKeys: () => _store.keys,
  getIdentity: () => _store.identity,
  getAddress: () => _store.identity?.address,
  getPort: () => _store.identity?.port,
  getOptions: () => _store.options,
  getMaxPeers: () => _store.options.maxPeers,
  getPrivateKey: () => _store.keys?.privateKey,
  getPublicKey: () => _store.keys?.publicKey,
  getPrivateKeyString: () => _store.keyStrings.privateKey,
  getPublicKeyString: () => _store.keyStrings.publicKey,
  getNodes: () => _store.nodes,
  getBlockchain: () => _store.chain,
  getBlockchainLength: () => _store.chain.chainLength,
  getLatestBlock: () => _store.chain.latestBlock,
  getPendingBlock: () => _store.chain.pendingBlock,
  getVerificationResponses: () => _store.chain.verificationResponses,
  getChainLengthResponses: () => _store.chainLengthResponses,
  getBlockRequestMap: () => _store.blockRequestMap,
  getAppLoopId: () => _store.appLoopId,
};

const setters = {
  setKeys: (keys: CryptoKeyPair) => _store.keys = keys,
  setKeyStrings: (keyStrings: KeyStrings) => _store.keyStrings = keyStrings,
  setIdentity: (identity: Identity) => _store.identity = identity,
  setOptions: (options: Options) => _store.options = options,
  setNodes: (nodes: Node[]) => _store.nodes = nodes,
  setBlockchain: (chain: BlockchainInfo) => _store.chain = chain,
  setPendingBlock: (block: Block) => _store.chain.pendingBlock = block,
  setVerificationResponses: (responsesMap: BlockchainInfo['verificationResponses']) =>
    _store.chain.verificationResponses = responsesMap,
  setChainLengthResponses: (responses: ChainLengthResponses) =>
    _store.chainLengthResponses = responses,
  setBlockRequestMap: (map: Map<number, Block>) => _store.blockRequestMap = map,
  setAppLoopId: (id: number) => _store.appLoopId = id,
};

export const store = { ...getters, ...setters, ...reducers };
