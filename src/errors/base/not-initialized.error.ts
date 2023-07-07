export class NotInitializedError extends Error {
  constructor(candidate: string) {
    super(`${candidate}, is not initialized`);
  }
}
