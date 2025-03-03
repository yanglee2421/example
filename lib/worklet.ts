export const minmax = (val: number, min: number, max: number) => {
  "worklet";
  return Math.min(max, Math.max(min, val));
};

export const inRange = (val: number, min: number, max: number) => {
  "worklet";
  return Object.is(val, minmax(val, min, max));
};
