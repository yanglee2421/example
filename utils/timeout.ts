export function timeout(deplay = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, deplay);
  });
}
