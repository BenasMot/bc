import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { Block } from '../database/types/Block.ts';
import { BlockchainInfo } from '../database/types/BlockchainInfo.ts';
import { ChainLengthResponse, Node, store } from './store.ts';

const addNode = (nodeAddress: Node) => {
  const nodes = store.getNodes();
  const newNodes = [...nodes, nodeAddress];
  store.setNodes(newNodes);
};

const addNodes = (newNodes: Node[]) => {
  const nodes = store.getNodes();
  store.setNodes([...nodes, ...newNodes]);
};

const removeNode = (nodeAddress: string) => {
  const nodes = store.getNodes();
  const newNodes = nodes.filter(({ address }) => address !== nodeAddress);
  store.setNodes(newNodes);
};

const saveBlockVerificationStatus = (hash: string, verified: boolean) => {
  const currentBlockchainInfo = store.getBlockchain();
  const currentMap = currentBlockchainInfo.checkedBlockHashMap;

  const newMap = { ...currentMap, [hash]: verified };
  const newBlockchainInfo = { ...currentBlockchainInfo, newMap };

  store.setBlockchain(newBlockchainInfo);
};

const getBlockVerificationStatus = (hash: string): boolean | undefined => {
  return store.getBlockchain().checkedBlockHashMap[hash];
};

const getBlockVerificationResponses = (hash: string) => {
  const responsesMap = store.getVerificationResponses();
  const blockResponses = responsesMap[hash] || [];

  return blockResponses;
};

const setBlockVerificationResponses = (hash: string, responses: boolean[]) => {
  const responsesMap = store.getVerificationResponses();
  const blockResponses = getBlockVerificationResponses(hash);
  const newResponses = [...blockResponses, ...responses];
  const newResponseMap = { ...responsesMap, [hash]: newResponses };

  store.setVerificationResponses(newResponseMap);
};

const addBlockVerificationResponse = (hash: string, response: boolean) => {
  const blockResponses = getBlockVerificationResponses(hash);
  setBlockVerificationResponses(hash, [...blockResponses, response]);
};

const removeBlockFromVerificationResponsesMap = (hash: string) => {
  const responsesMap = store.getVerificationResponses();
  const responsesMapKeys = Object.keys(responsesMap);
  const newResponsesMap = responsesMapKeys.reduce(
    (accummulator, key) => {
      return key === hash ? accummulator : { ...accummulator, [key]: responsesMap[key] };
    },
    {},
  );

  store.setVerificationResponses(newResponsesMap);
};

const addBlockToChain = (block: Block) => {
  removeBlockFromVerificationResponsesMap(block.hash);

  const currentChainInfo = store.getBlockchain();
  const newChainInfo: BlockchainInfo = {
    pendingBlock: undefined,
    latestBlock: block,
    chainLength: currentChainInfo.chainLength + 1,
    checkedBlockHashMap: currentChainInfo.checkedBlockHashMap,
    verificationResponses: currentChainInfo.verificationResponses,
  };

  store.setBlockchain(newChainInfo);
};

const addChainLengthResponse = (response: ChainLengthResponse, socket: StandardWebSocketClient) => {
  const currentResponses = store.getChainLengthResponses();
  const newResponses = [...currentResponses, { response, socket }];

  store.setChainLengthResponses(newResponses);
};

export const reducers = {
  addNode,
  addNodes,
  removeNode,
  saveBlockVerificationStatus,
  getBlockVerificationStatus,
  getBlockVerificationResponses,
  addBlockVerificationResponse,
  removeBlockFromVerificationResponsesMap,
  addBlockToChain,
  addChainLengthResponse,
};
