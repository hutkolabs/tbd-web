import type { Chain } from '@wagmi/core';
import {
  connect,
  disconnect,
  getAccount,
  getNetwork,
  getWalletClient,
  getPublicClient,
  watchAccount,
  watchNetwork,
  watchPublicClient,
  watchWalletClient
} from '@wagmi/core';
import { makeAutoObservable } from 'mobx';

import { Connector } from './wagmi.config';
import { Account, Network, PClient, WClient } from './wagmi.types';

export class WagmiStore {
  account: Account;
  walletClient: WClient | undefined;
  publicClient: PClient;
  network: Network;

  get chains() {
    return this.network.chains;
  }

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  async connect() {
    await connect({
      connector: Connector
    });
  }

  async disconnect() {
    await disconnect();
  }

  //#region init
  private init() {
    this.initAccount();
    this.initNetwork();
  }

  private initAccount() {
    this.account = getAccount();

    watchAccount(account => {
      this.account = account;
    });
  }

  private initNetwork() {
    this.network = getNetwork();

    let unwatchPClient = this.initPublicClient(this.network.chain);
    let unwatchWClient = this.initWalletClient(this.network.chain);

    watchNetwork(network => {
      unwatchPClient();
      unwatchWClient();

      this.network = network;

      unwatchPClient = this.initPublicClient(network.chain);
      unwatchWClient = this.initWalletClient(network.chain);
    });
  }

  private initPublicClient(chain?: Chain) {
    this.publicClient = getPublicClient({
      chainId: chain?.id
    });

    return watchPublicClient(
      {
        chainId: chain?.id
      },
      publicClient => {
        this.publicClient = publicClient;
      }
    );
  }

  private initWalletClient(chain?: Chain) {
    getWalletClient({
      chainId: chain?.id
    }).then(walletClient => {
      this.walletClient = walletClient;
    });

    return watchWalletClient(
      {
        chainId: chain?.id
      },
      walletClient => {
        this.walletClient = walletClient;
      }
    );
  }
  //#endregion
}
