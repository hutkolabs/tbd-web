import { ApiPromise, WsProvider } from '@polkadot/api';
import { makeAutoObservable } from 'mobx';

export class PolkadotStore {
  private api: ApiPromise;

  get isReady() {
    return this.api.isReady;
  }

  constructor() {
    makeAutoObservable(this);

    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    this.api = new ApiPromise({ provider: wsProvider });
  }

  async test() {
    await this.isReady;

    const chain = await this.api.rpc.system.chain();

    console.log(`You are connected to chain ${chain}!`);
  }
}
