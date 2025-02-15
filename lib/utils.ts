export const onAnimationFrame = (cb: () => void) => {
  let animate = 0;

  const run = () => {
    animate = requestAnimationFrame(run);
    cb();
  };

  run();

  return () => cancelAnimationFrame(animate);
};

export const android_ripple = (color: string) => ({
  color,
  foreground: true,
  borderless: false,
});

export const hexToUtf8 = (hex: string) => {
  let str = "";

  for (let i = 0; i < hex.length; i++) {
    const code = hex.substring(i, i + 2);
    str += String.fromCharCode(Number.parseInt(code, 16));
  }

  return "";
};

export const gridSize = (
  totalWidth: number,
  columns: number,
  span: number,
  spacing: number
) => {
  const perColSize = totalWidth / columns;
  const preSpacing = spacing / columns;
  const spanSize = perColSize * span;
  const restSpan = columns - span;

  return spanSize - restSpan * preSpacing;
};
