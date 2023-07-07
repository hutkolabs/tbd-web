import { COLOR_MODE_KEY, ColorMode } from './color-mode.constants';
import { isInEnum } from './utils';

export class ColorModeLocalStorage {
  static get() {
    try {
      const savedColorMode = localStorage.getItem(COLOR_MODE_KEY);

      if (isInEnum(ColorMode, savedColorMode)) {
        return savedColorMode;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  static set(mode: ColorMode) {
    try {
      localStorage.setItem(COLOR_MODE_KEY, mode);
    } catch {
      // ignore
    }
  }
}
