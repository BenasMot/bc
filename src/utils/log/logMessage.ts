import { Message } from '../../client/message.ts';

export const logMessage = (message: Message, direction: 'SENDING' | 'RECEIVED') => {
  const type = message.type;
  const data = Object.fromEntries(Object.entries(message).filter(([key]) => key !== 'type'));

  console.log(`### ${direction} - ${type}\n  ${JSON.stringify(data)}\n---`);
};
