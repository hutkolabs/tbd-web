import { useEffect } from 'react';

import { SnackStore } from '@store';
import { CFC, InjectedCFC } from '@types';
import { withStores } from '@utils';
import { SnackbarProvider as NotiSnackbarProvider, useSnackbar } from 'notistack';

const stores = {
  snack: SnackStore
};

const SnackbarProviderSetter: InjectedCFC<typeof stores> = ({ snack }) => {
  const context = useSnackbar();
  useEffect(() => {
    snack.setSnackBarContext(context);
  }, [snack, context]);

  return <></>;
};

export const Init = withStores(stores)(SnackbarProviderSetter);

export const SnackbarProvider: CFC = ({ children }) => (
  <NotiSnackbarProvider
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'bottom'
    }}
    maxSnack={3}
  >
    <Init />
    {children}
  </NotiSnackbarProvider>
);
