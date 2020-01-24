interface ITestPromiseOptions {
  promise: Promise<any>;
  resolve: (result?: any) => void;
  reject: (error?: any) => void;
}

export function createTestPromise(): ITestPromiseOptions {
  let externallyResolve: (result?: any) => void = () => undefined;
  let externallyReject: (error?: any) => void = () => undefined;
  const promise = new Promise((resolve, reject) => {
    externallyResolve = resolve;
    externallyReject = reject;
  });
  return {
    promise,
    resolve: externallyResolve,
    reject: externallyReject,
  };
}

export function createTestPromises(num: number) {
  return [...Array(num).keys()].map(() => {
    const { resolve, reject, promise } = createTestPromise();
    return { resolve, reject, promise };
  });
}

export async function waitMillis(millisToWait: number): Promise<undefined> {
  return new Promise(resolve => {
    setTimeout(resolve, millisToWait);
  });
}
