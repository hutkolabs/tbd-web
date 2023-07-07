import { ColorModeStore } from '@modules/color-mode';
import { WagmiStore } from '@modules/wagmi';
import { ConstructorOfValues } from '@types';
import { makeAutoObservable } from 'mobx';

import { UserStore, CounterStore } from './example';
import { SnackStore } from './snack.store';

export class RootStore {
  static map: Map<ConstructorOfValues<RootStore>, keyof RootStore> = new Map();

  //#region examples
  userStore = new UserStore();
  counterStore = new CounterStore();
  //#endregion

  //#region modules
  colorModeStore = new ColorModeStore();
  wagmiStore = new WagmiStore();
  //#endregion

  snackStore = new SnackStore();

  constructor() {
    makeAutoObservable(this);

    for (const [key, value] of Object.entries(this)) {
      RootStore.map.set(value.constructor.prototype.constructor, key as keyof RootStore);
    }
  }
}
