import { Block } from './types/Block.ts';
import { getDatabase } from './database.ts';
import { TABLES } from './constants.ts';
import { createInsertStatement } from './utils/createInsertStatement.ts';
import { camelCaseToSnakeCase } from './utils/camelCaseToSnakeCase.ts';

const addBlockToChain = (block: Block) => {
  getDatabase().execute(createInsertStatement(block, TABLES.BLOCKCHAIN));
};

const getBlockFromChain = (blockNumber: number): Block | undefined => {
  const block: Block = {
    chainNumber: 0,
    previousBlockHash: '',
    data: '',
    publicKey: '',
    nonce: 1,
    hash: '',
    timestamp: 1,
    signature: '',
  };
  const keys = Object.keys(block);
  const dbKeys = keys.map(camelCaseToSnakeCase);

  const values = getDatabase().query<[string, string]>(
    `SELECT ${dbKeys.join(', ')} FROM ${TABLES.BLOCKCHAIN} WHERE chain_number = ?;`,
    [blockNumber],
  )[0];

  if (values?.length !== keys.length) {
    return undefined;
  }

  const entries = keys.map((key, index) => [key, values[index]]);

  return Object.fromEntries(entries);
};

const getSavedChainLength = () => {
  return getDatabase().query(`SELECT * FROM ${TABLES.BLOCKCHAIN};`).length;
};

export const db = {
  addBlockToChain,
  getBlockFromChain,
  getSavedChainLength,
};
