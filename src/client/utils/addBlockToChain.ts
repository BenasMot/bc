import { db } from '../../database/actions.ts';
import { Block } from '../../database/types/Block.ts';
import { store } from '../../store/store.ts';

export const addBlockToChain = (block: Block) => {
  store.addBlockToChain(block);
  db.addBlockToChain(block);
};
