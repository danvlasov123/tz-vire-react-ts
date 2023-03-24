export const findMaxNumber = <T extends object>(
  array: T[],
  key: keyof T
): T => {
  return array.reduce((acc: T, curr: T) => (acc[key] > curr[key] ? acc : curr));
};
