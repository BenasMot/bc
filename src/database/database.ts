import { DB } from 'https://deno.land/x/sqlite@v3.7.0/mod.ts';
import { env } from '../../env.ts';
import { TABLES } from './constants.ts';
import { BLOCK_FIELDS } from './types/Block.ts';

const PRODUCTION_DB = './db.sqlite';
const TEST_DB = './test_db.sqlite';

let db: DB;
export const initDatabase = () => {
  const filepath = env.ENVIRONMENT === 'TEST' ? TEST_DB : PRODUCTION_DB;
  db = new DB(filepath);

  db.execute(`
    CREATE TABLE IF NOT EXISTS ${TABLES.BLOCKCHAIN} (
      ${BLOCK_FIELDS.chainNumber} INTEGER PRIMARY KEY UNIQUE,
      ${BLOCK_FIELDS.previousBlockHash} STRING,
      ${BLOCK_FIELDS.data} STRING,
      ${BLOCK_FIELDS.publicKey} STRING,
      ${BLOCK_FIELDS.nonce} INTEGER,
      ${BLOCK_FIELDS.hash} STRING,
      ${BLOCK_FIELDS.timestamp} NUMBER,
      ${BLOCK_FIELDS.signature} STRING
    );
  `);

  db.execute(`
    CREATE TABLE IF NOT EXISTS ${TABLES.MEASUREMENTS} (
      agent_id STRING PRIMARY KEY UNIQUE,
      agent_name STRING,
      timestamp STRING,
      measurement FLOAT
    );
  `);
};

export const getDatabase = () => db;
