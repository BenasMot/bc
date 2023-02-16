import { StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { store } from '../../store/store.ts';
import { verifySignature } from '../../utils/encryption/encryption.ts';
import { hashData } from '../../utils/hashing/hash.ts';
import { BlockBroadcastRequestMessage } from '../message.ts';
import { sendBlockBroadcastResponse } from '../senders/sendBlockBroadcastResponse.ts';

export const handleBlockBroadcastRequest = async (
  message: BlockBroadcastRequestMessage,
  socket: StandardWebSocketClient,
) => {
  const {
    previousBlockHash,
    data,
    publicKey,
    chainNumber,
    nonce,
    hash,
    timestamp,
    signature,
  } = message.block;

  const blockBaseWithNonce = {
    data,
    previousBlockHash,
    chainNumber,
    publicKey,
    nonce,
  };
  const blockWithoutSignature = { ...blockBaseWithNonce, hash, timestamp };

  const isChainNumberCorrect = chainNumber === store.getBlockchainLength() + 1;
  const isPreviousHashCorrect = previousBlockHash === store.getLatestBlock()?.hash;
  const isHashCorrect = hash === hashData(JSON.stringify(blockBaseWithNonce));
  const isSignatureValid = await verifySignature(
    publicKey,
    signature,
    JSON.stringify(blockWithoutSignature),
  );

  const verified = isChainNumberCorrect && isHashCorrect && isPreviousHashCorrect &&
    isSignatureValid;

  console.log('@@@', verified, {
    isChainNumberCorrect,
    isHashCorrect,
    isPreviousHashCorrect,
    isSignatureValid,
  });

  store.saveBlockVerificationStatus(hash, verified);
  await sendBlockBroadcastResponse(socket, verified, hash);
};
