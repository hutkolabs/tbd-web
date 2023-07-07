import { useMemo } from 'react';

import { ColorModeStore } from '@modules/color-mode';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { InjectedCFC } from '@types';
import { observer } from 'mobx-react-lite';

import { MuiComponents } from './mui.components';
import { MuiPalettes } from './mui.palettes';
import { withStores } from '../../utils';

const stores = {
  colorMode: ColorModeStore
};

const MuiProviderView: InjectedCFC<typeof stores> = ({ children, colorMode }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: MuiPalettes[colorMode.mode],
        ...MuiComponents
      }),
    [colorMode.mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export const MuiProvider = withStores(stores)(observer(MuiProviderView));
