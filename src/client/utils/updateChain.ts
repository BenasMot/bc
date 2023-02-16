import { db } from '../../database/actions.ts';
import { ChainLengthResponses, store } from '../../store/store.ts';
import { range } from '../../utils/other/range.ts';
import { sleep } from '../../utils/other/sleep.ts';
import { sendChainRequest } from '../senders/sendChainRequest.ts';
import { requestBlock } from './requestBlock.ts';

export const updateChain = async () => {
  const savedChainLength = db.getSavedChainLength();
  const peerChainLengths = await gatherChainLengths();
  const dominantResponse = getDominantResponse(peerChainLengths);

  const foundLongerChain = dominantResponse && savedChainLength < dominantResponse.response.chainLength;

  if (foundLongerChain) {
    const socket = dominantResponse.socket;
    await Promise.all(
      range(savedChainLength + 1, dominantResponse.response.chainLength)
        .map((blockNumber) => requestBlock(socket, blockNumber)),
    ).catch(() => {
      throw new Error('Failed requesting block');
    });
  }
};

const gatherChainLengths = async () => {
  const nodes = store.getNodes();

  await Promise.all(nodes.map(sendChainRequest));

  let checkCount = 0;
  let responses = store.getChainLengthResponses();
  while (!(responses.length >= (nodes.length / 2)) && checkCount < 4) {
    responses = store.getChainLengthResponses();
    checkCount++;
    await sleep(1000);
  }

  return responses;
};

const getDominantResponse = (
  responses: ChainLengthResponses,
): ChainLengthResponses[number] | undefined => {
  if (!responses || responses.length < 1) {
    console.error('No chain length responses received');
    return;
  }

  const map = new Map<string, number>();
  responses.forEach(({ response }) => {
    const key = `${response.lastBlockHash}_${response.chainLength}`;
    const identicalResponseCount = map.get(key);

    if (identicalResponseCount === undefined) {
      map.set(key, 1);
    } else {
      map.set(key, identicalResponseCount + 1);
    }
  });

  const mostFrequentResponses = [...map].reduce((carry, response) => {
    const [_, responseFrequency] = response;

    return carry.filter(([_, count]) => count >= responseFrequency);
  }, [...map]);

  const mostFrequentResponseKey = mostFrequentResponses[0][0];
  const lastBlockHash = mostFrequentResponseKey.split('_')[0];
  const chainLength = Number(mostFrequentResponseKey.split('_')[1]);

  return responses.find(({ response: resp }) =>
    resp.chainLength === chainLength && resp.lastBlockHash === lastBlockHash
  )!;
};
