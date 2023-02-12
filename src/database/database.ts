import { Database, SQLite3Connector } from 'https://deno.land/x/denodb@v1.2.0/mod.ts';
import { env } from '../../env.ts';
import { BlockchainModel, MeasurementsModel } from './models.ts';

const PRODUCTION_DB = './db.sqlite';
const TEST_DB = '/test_db.sqlite';

let db: Database;
export const initDatabase = async () => {
  const filepath = env.ENVIRONMENT === 'TEST' ? TEST_DB : PRODUCTION_DB;
  const connection = new SQLite3Connector({ filepath });
  // @ts-ignore
  db = new Database({...connection, debug: true});

  db.link([MeasurementsModel, BlockchainModel]);
  await db.sync({ drop: false });
};

export const getDatabase = () => db;
