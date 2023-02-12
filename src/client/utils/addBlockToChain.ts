import { db } from '../../database/actions.ts';
import { Block } from '../../database/types/Block.ts';
import { store } from '../../store/store.ts';

export const addBlockToChain = async (block: Block) => {
  store.addBlockToChain(block);
  await db.addBlockToChain(block);
};
