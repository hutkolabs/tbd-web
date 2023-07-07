import logoUrl from '@assets/logo.svg';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';

// const {
//   // VITE_WEB3AUTH_CLIENT_ID: clientId,
//   VITE_WEB3AUTH_CLIENT_VERIFIER_NAME: verifier,
//   VITE_AUTH0_CLIENT_ID: auth0ClientId
// } = import.meta.env;

const clientId = 'YOUR_WEB3AUTH_CLIENT_ID';
const web3AuthNetwork = 'cyan';
const name = 'YOUR_APP_NAME';

const web3AuthInstance = new Web3Auth({
  clientId, // get it from Web3Auth Dashboard
  web3AuthNetwork,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.OTHER
    //polkadot
  }
});

const openLoginAdapterInstance = new OpenloginAdapter({
  adapterSettings: {
    network: web3AuthNetwork,
    uxMode: 'popup',
    whiteLabel: {
      name,
      logoLight: logoUrl,
      logoDark: logoUrl,
      defaultLanguage: 'en',
      dark: true // whether to enable dark mode. defaultValue: false
    }
    // loginConfig: {
    //   jwt: {
    //     verifier,
    //     typeOfLogin: 'jwt',
    //     clientId: auth0ClientId
    //   }
    // }
  }
});
web3AuthInstance.configureAdapter(openLoginAdapterInstance);

export const web3Auth = web3AuthInstance;
