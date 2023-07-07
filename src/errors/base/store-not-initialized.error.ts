export class StoreNotInitializedError extends Error {
  constructor(childStoreName: string, parentStoreName?: string) {
    let message = `Store ${childStoreName} not initialized`;
    message += parentStoreName ? ` in ${parentStoreName}` : '';

    super(message);
  }
}
