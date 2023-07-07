import { ColorModeStore } from '@modules/color-mode';
import { Box, Button, Typography } from '@mui/material';
import { WithStores } from '@types';
import { withStores } from '@utils';
import { observer } from 'mobx-react-lite';

const stores = {
  colorMode: ColorModeStore
};

export const ToggleModeView: WithStores<typeof stores> = ({ colorMode }) => {
  return (
    <Box>
      <Typography>{colorMode.mode}</Typography>
      <Button onClick={() => colorMode.toggleMode()}>Toggle Mode</Button>
    </Box>
  );
};

export const ToggleMode = withStores(stores)(observer(ToggleModeView));
