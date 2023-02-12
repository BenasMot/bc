export const range = (from: number, to: number) => {
  return Array(to - from).fill(from).map((val, index) => val + index);
};
