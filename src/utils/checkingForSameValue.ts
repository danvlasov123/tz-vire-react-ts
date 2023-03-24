export const checkForSameValue = <T extends object>(
  filteredArray: T[],
  secondArray: T[],
  key: keyof T
): T[] => {
  return filteredArray.filter((f) =>
    secondArray.some((s) => s[key] === f[key])
  );
};
