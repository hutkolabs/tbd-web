import { Keyring, ApiPromise, WsProvider } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { SafeEventEmitterProvider } from '@web3auth/base';
import { toJS } from 'mobx';

export class PolkadotRPC {
  constructor(private readonly provider: SafeEventEmitterProvider) {}

  async makeClient() {
    console.log('Establishing connection to Polkadot RPC...');
    const provider = new WsProvider(
      'wss://westend.api.onfinality.io/ws?apikey=19cb8ddb-a945-4c95-86bf-a1a4a244d1e7'
    ); // testnet
    // const provider = new WsProvider("wss://rpc.polkadot.io"); // mainnet
    const api = await ApiPromise.create({ provider });
    const resp = await api.isReady;
    console.log('Polkadot RPC is ready', resp);

    return api;
  }

  async getPolkadotKeyPair() {
    await cryptoWaitReady();
    console.log('this.provider', toJS(this.provider));

    const privateKey = (await this.provider.request({
      method: 'private_key'
    })) as string;
    console.log('privateKey', '0x' + privateKey);
    const keyring = new Keyring({ ss58Format: 42, type: 'sr25519' });

    const keyPair = keyring.addFromUri('0x' + privateKey);
    console.log('keyPair', keyPair);

    return keyPair;
  }

  async getAccounts() {
    const keyPair = await this.getPolkadotKeyPair();

    return keyPair.address;
  }

  async getBalance() {
    const keyPair = await this.getPolkadotKeyPair();
    const api = await this.makeClient();
    const data = await api.query.system.account(keyPair.address);
    console.log(data);

    return data.toHuman();
  }

  async signAndSendTransaction() {
    const keyPair = await this.getPolkadotKeyPair();
    const api = await this.makeClient();
    const txHash = await api.tx.balances
      .transfer('5GQtQY6RweKN1apf6776Sz8mTeBh57Y3Ss1FQjqommfijzLV', 12345)
      .signAndSend(keyPair);
    console.log(txHash);

    return txHash.toHuman();
  }
}
