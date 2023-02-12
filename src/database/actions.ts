import { BlockchainModel } from './models.ts';
import { Block } from './types/Block.ts';
import { FieldValues } from './types/Fields.ts';

const addBlockToChain = async (block: Block) => {
  const fields: FieldValues<Block> = block;
  await BlockchainModel.create(fields);
};

const getBlockFromChain = async (blockNumber: number): Promise<Block> => {
  return (await BlockchainModel.find(blockNumber)) as unknown as Block;
};

const getSavedChainLength = async () => {
  const blocks = await BlockchainModel.all();
  return blocks.length;
};

export const db = {
  addBlockToChain,
  getBlockFromChain,
  getSavedChainLength,
};
