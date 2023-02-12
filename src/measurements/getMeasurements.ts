import { store } from '../store/store.ts';
import { exportPublicKey } from '../utils/encryption/encryption.ts';
import { Measurement } from './measurement.ts';

export const getMeasurements = async (): Promise<Measurement[]> => {
  // TODO track unpublished measurements
  const newMeasurement: Measurement = {
    agentId: await exportPublicKey(),
    agentName: store.getIdentity().name,
    measurement: Math.random(),
    timestamp: new Date().toISOString(),
  };

  return [newMeasurement];
};
