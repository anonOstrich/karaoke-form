export async function promiseWait(milliseconds: number, shouldSucceed: boolean = true): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve();
      } else {
        reject(new Error('Generic failure'));
      }
    }, milliseconds);
  });
}
