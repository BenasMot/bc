import { assertEquals } from 'https://deno.land/std@0.175.0/testing/asserts.ts';
import { env } from '../../env.ts';
import { getDatabase, initDatabase } from './database.ts';
import { TestModel } from './models.ts';

Deno.test('Database', async ({ step: it }) => {
  env.ENVIRONMENT = 'TEST';
  await initDatabase();
  getDatabase().link([TestModel]);
  await getDatabase().sync({ drop: true });

  await it('should place items in dabatabse', async () => {
    const item1 = { id: 1, value: 'test1' };
    const item2 = { id: 2, value: 'test2' };

    assertEquals(0, (await TestModel.all()).length);
    await TestModel.create([item1, item2]);
    assertEquals(2, (await TestModel.all()).length);
  });

  await getDatabase().close();
});
