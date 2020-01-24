interface ITestPromiseOptions {
  promise: Promise<any>;
  resolve: (result?: any, duration?: number) => void;
  reject: (error?: any, duration?: number) => void;
}

export function createTestPromise(): ITestPromiseOptions {
  let externallyResolve: (result?: any, duration?: number) => void = () =>
    undefined;
  let externallyReject: (error?: any, duration?: number) => void = () =>
    undefined;
  const promise = new Promise((resolve, reject) => {
    externallyResolve = (result, duration = 0) => {
      setTimeout(() => {
        resolve(result);
      }, duration);
    };
    externallyReject = (error, duration = 0) => {
      setTimeout(() => {
        reject(error);
      }, duration);
    };
  });
  return {
    promise,
    resolve: externallyResolve,
    reject: externallyReject,
  };
}

export function createTestPromises(num: number): ITestPromiseOptions[] {
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
