export const randomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
};
