import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.2.0/mod.ts';
import { Measurement } from '../measurements/measurement.ts';
import { Block } from './types/Block.ts';
import { Fields } from './types/Fields.ts';

export class MeasurementsModel extends Model {
  static table = 'measurements';
  static timestamps = true;
  static fields: Fields<Measurement> = {
    agentId: { type: DataTypes.STRING, primaryKey: true, unique: true },
    agentName: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    measurement: DataTypes.FLOAT,
  };
}

export class BlockchainModel extends Model {
  static table = 'blockchain';
  static timestamps = true;
  static fields: Fields<Block> = {
    chainNumber: { type: DataTypes.INTEGER, primaryKey: true, unique: true },
    previousBlockHash: DataTypes.STRING,
    data: DataTypes.STRING,
    publicKey: DataTypes.STRING,
    nonce: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    timestamp: DataTypes.STRING,
    signature: DataTypes.STRING,
  };
}

type TestData = { id: number; value: string };
export class TestModel extends Model {
  static table = 'test';
  static timestamps = true;
  static fields: Fields<TestData> = {
    id: { type: DataTypes.INTEGER, primaryKey: true, unique: true },
    value: DataTypes.STRING,
  };
}
