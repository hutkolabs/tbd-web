export class ContextNotExistError extends Error {
  constructor(hookName: string, providerName: string) {
    super(`${hookName} must be used within a ${providerName}`);
  }
}
