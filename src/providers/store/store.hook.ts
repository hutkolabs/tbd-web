import { useContext } from 'react';

import { ContextNotExistError } from '@errors';

import { StoreProvider } from '.';
import { StoreContext } from './store.context';

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new ContextNotExistError(useStore.name, StoreProvider.name);
  }

  return context;
};
