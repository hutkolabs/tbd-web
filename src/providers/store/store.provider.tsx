import { CFC } from '@types';

import { StoreContext } from './store.context';
import { initializeStore } from './store.initializer';

export const StoreProvider: CFC = ({ children }) => {
  const store = initializeStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
