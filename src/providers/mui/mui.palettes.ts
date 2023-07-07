import { ColorMode } from '@modules/color-mode';
import { PaletteOptions } from '@mui/material';
export const MuiPalettes: Record<ColorMode, PaletteOptions> = {
  [ColorMode.Light]: {
    mode: ColorMode.Light
  },
  [ColorMode.Dark]: {
    mode: ColorMode.Dark
  }
};
