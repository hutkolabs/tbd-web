import { CFC } from '@types';

import { CContainer } from './container';

export const Layout: CFC = ({ children }) => {
  return <CContainer>{children}</CContainer>;
};
