import { ToggleMode } from '@components/example';
import { WagmiStore } from '@modules/wagmi';
import { Box, Button, Typography } from '@mui/material';
import { WithStores } from '@types';
import { withStores } from '@utils';
import { observer } from 'mobx-react-lite';

const stores = {
  wagmi: WagmiStore
};

const HomePageView: WithStores<typeof stores> = ({ wagmi }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 5
      }}
    >
      <ToggleMode />

      <Typography variant="h1">Home</Typography>
      <Typography variant="body1">{wagmi.account.address}</Typography>
      <Button onClick={async () => wagmi.connect()} variant="contained">
        Connect
      </Button>
      <Button onClick={async () => wagmi.disconnect()} variant="contained">
        Disconnect
      </Button>

      <Button
        onClick={async () =>
          wagmi.walletClient?.signMessage({
            message: 'Hello World'
          })
        }
        variant="contained"
      >
        Sign Message
      </Button>
    </Box>
  );
};

export const HomePage = withStores(stores)(observer(HomePageView));
