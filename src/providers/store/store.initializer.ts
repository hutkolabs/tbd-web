import { RootStore } from '@store';

let store: RootStore;

export const initializeStore = (): RootStore => {
  const _store = store ?? new RootStore();

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store;
  }
  // Create the store once in the client
  if (!store) {
    store = _store;
  }

  return _store;
};
