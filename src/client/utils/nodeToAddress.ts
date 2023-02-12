import { Node } from '../../store/store.ts';

export const nodeToAddress = (node: Node): string => {
  return node.address;
};
