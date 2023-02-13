export const ifStringWrapInBraces = (item: string | number): string | number => {
  if (typeof item === 'string') {
    return `'${item}'`;
  } else {
    return item;
  }
};
