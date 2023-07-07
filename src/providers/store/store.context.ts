import { createContext } from 'react';

import { RootStore } from '@store';

export const StoreContext = createContext<RootStore | undefined>(undefined);
