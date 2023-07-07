import { OverrideMuiLinkComponents } from '@components';
import { ThemeOptions } from '@mui/material';

export const MuiComponents: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    },
    ...OverrideMuiLinkComponents
  }
};
