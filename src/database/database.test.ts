import { assertEquals } from 'https://deno.land/std@0.175.0/testing/asserts.ts';
import { env } from '../../env.ts';
import { db } from './actions.ts';
import { getDatabase, initDatabase } from './database.ts';
import { aBlock } from './generators/aBlock.ts';
import { Block } from './types/Block.ts';
import { camelCaseToSnakeCase } from './utils/camelCaseToSnakeCase.ts';

Deno.test('Database', async ({ step }) => {
  const it = async (title: string, fn: () => void) => {
    before();
    const res = await step(title, fn);
    after();
    return res;
  };
  env.ENVIRONMENT = 'TEST';

  await it('should place items in dabatabse', () => {
    db.addBlockToChain(aBlock());
    assertEquals(db.getBlockFromChain(0) as unknown as Block, aBlock());
  });

  await it('should contain all columns', () => {
    const columns = Object.keys(aBlock()).map(camelCaseToSnakeCase);
    columns.forEach((column) => {
      const count = getDatabase().query<[number]>(`
      SELECT count(*)
      FROM sqlite_master
      WHERE type = 'table' AND name = 'blockchain' AND sql LIKE '%${column}%';
      `)[0][0];
      assertEquals(count, 1);
    });
  });

  await it('should get length of saved chain', () => {
    db.addBlockToChain(aBlock({ chainNumber: 0 }));
    db.addBlockToChain(aBlock({ chainNumber: 1 }));
    assertEquals(db.getSavedChainLength(), 2);
  });
});

const before = () => {
  initDatabase();
};

const after = () => {
  getDatabase().execute('DROP TABLE blockchain;');
  getDatabase().close(true);
};
