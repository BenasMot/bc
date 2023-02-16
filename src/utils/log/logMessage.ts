import { Message } from '../../client/message.ts';

export const logMessage = (
  message: Message,
  direction: 'SENDING' | 'RECEIVED',
  address?: string,
) => {
  const type = message.type;
  const data = Object.fromEntries(Object.entries(message).filter(([key]) => key !== 'type'));
  const addressPrepend = direction === 'SENDING' ? 'to' : 'from';
  console.log(`### ${direction} ${addressPrepend} ${address}\n###${type}\n  ${JSON.stringify(data)}\n---`);
};
