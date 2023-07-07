import { makeAutoObservable } from 'mobx';

import { ColorMode } from './color-mode.constants';
import { ColorModeLocalStorage } from './color-mode.storage';
import { matchMedia } from './utils';

export class ColorModeStore {
  mode: ColorMode = ColorMode.Light;

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  init() {
    const savedColorMode = ColorModeLocalStorage.get();

    if (savedColorMode) {
      this.mode = savedColorMode;

      return;
    }

    const prefersDarkModeWatcher = matchMedia('(prefers-color-scheme: dark)');

    if (!prefersDarkModeWatcher) {
      return;
    }

    this.mode = prefersDarkModeWatcher.matches ? ColorMode.Dark : ColorMode.Light;

    if (prefersDarkModeWatcher.addEventListener) {
      prefersDarkModeWatcher.addEventListener('change', event => {
        this.mode = event.matches ? ColorMode.Dark : ColorMode.Light;
      });
    }
  }

  //todo: create setMode in case we more than 2 modes
  toggleMode() {
    this.mode = this.mode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light;

    ColorModeLocalStorage.set(this.mode);
  }
}
