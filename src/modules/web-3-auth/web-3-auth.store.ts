import logoUrl from '@assets/logo.svg';
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { makeObservable, observable, toJS } from 'mobx';

const appName = 'YOUR_APP_NAME';
const web3AuthNetwork = 'cyan';

const {
  VITE_WEB3AUTH_CLIENT_ID: clientId,
  VITE_WEB3AUTH_CLIENT_VERIFIER_NAME: verifier,
  VITE_AUTH0_CLIENT_ID: auth0ClientId
} = import.meta.env;

const noInitializedError = new Error('Web3Auth is not initialized');

export class Web3AuthStore {
  web3Auth: Web3Auth | null = null;
  provider: SafeEventEmitterProvider | null = null;
  loggedIn = false;

  get instance() {
    return this.web3Auth;
  }

  constructor() {
    makeObservable(this, {
      web3Auth: false,
      provider: false,
      loggedIn: observable
    });
  }

  async init() {
    try {
      this.web3Auth = this.createWeb3Auth();

      await this.web3Auth.initModal();
      const provider = this.web3Auth.provider;

      if (provider) {
        this.provider = provider;
      } else {
        console.log('provider is not defined');
      }

      if (this.web3Auth.connected) {
        this.loggedIn = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async connect() {
    if (!this.web3Auth) {
      throw noInitializedError;
    }

    const web3authProvider = await this.web3Auth.connect();
    console.log('web3authProvider!!!', toJS(web3authProvider));
    this.provider = web3authProvider;
    this.loggedIn = true;
  }

  async disconnect() {
    if (!this.web3Auth) {
      throw noInitializedError;
    }

    await this.web3Auth.logout();
    this.provider = null;
    this.loggedIn = false;
  }

  createWeb3Auth() {
    const web3Auth = new Web3Auth({
      clientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.OTHER,
        // polkadot
        tickerName: 'Westies',
        blockExplorer: 'https://westend.subscan.io',
        rpcTarget:
          'https://westend.api.onfinality.io/rpc?apikey=19cb8ddb-a945-4c95-86bf-a1a4a244d1e7',
        wsTarget: 'wss://westend.api.onfinality.io/ws?apikey=19cb8ddb-a945-4c95-86bf-a1a4a244d1e7',
        chainId: '0xA',
        displayName: 'Westend',
        ticker: 'WND'
      },
      web3AuthNetwork,
      uiConfig: {
        appName: appName,
        theme: 'auto',
        defaultLanguage: 'en',
        appLogo: logoUrl, // Your App Logo Here
        modalZIndex: '2147483647'
      }
    });

    const openLoginAdapterInstance = new OpenloginAdapter({
      adapterSettings: {
        network: web3AuthNetwork,
        uxMode: 'popup',
        whiteLabel: {
          name: appName,
          logoLight: logoUrl,
          logoDark: logoUrl,
          defaultLanguage: 'en',
          dark: true // whether to enable dark mode. defaultValue: false
        },
        loginConfig: {
          jwt: {
            verifier,
            typeOfLogin: 'jwt',
            clientId: auth0ClientId
          }
        }
      }
    });
    web3Auth.configureAdapter(openLoginAdapterInstance);

    return web3Auth;
  }
}
