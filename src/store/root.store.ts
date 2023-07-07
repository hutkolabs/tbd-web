import { ColorModeStore } from '@modules/color-mode';
import { Web3AuthStore } from '@modules/web-3-auth/web-3-auth.store';
import { ConstructorOfValues } from '@types';
import { makeAutoObservable } from 'mobx';

import { SnackStore } from './snack.store';

export class RootStore {
  static map: Map<ConstructorOfValues<RootStore>, keyof RootStore> = new Map();

  //#region modules
  colorModeStore = new ColorModeStore();
  web3AuthStore = new Web3AuthStore();
  //#endregion

  snackStore = new SnackStore();

  constructor() {
    makeAutoObservable(this);

    for (const [key, value] of Object.entries(this)) {
      RootStore.map.set(value.constructor.prototype.constructor, key as keyof RootStore);
    }
  }
}
