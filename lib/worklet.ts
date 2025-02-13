export const minmax = (val: number, min: number, max: number) => {
  "worklet";
  return Math.min(max, Math.max(min, val));
};
