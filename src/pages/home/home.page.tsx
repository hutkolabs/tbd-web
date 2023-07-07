import { useEffect } from 'react';

import { PolkadotRPC } from '@modules/polkadot/rpc';
import { Web3AuthStore } from '@modules/web-3-auth/web-3-auth.store';
import { WithStores } from '@types';
import { withStores } from '@utils';
import { SafeEventEmitterProvider } from '@web3auth/base';
import { observer } from 'mobx-react-lite';

const notInitializedMessage = 'Web3Auth not initialized yet';
const noProviderMessage = 'provider not initialized yet';

const stores = {
  web3Auth: Web3AuthStore
};

export const HomePageView: WithStores<typeof stores> = ({ web3Auth }) => {
  useEffect(() => {
    void web3Auth.init();
  }, [web3Auth]);

  function uiConsole(...args: unknown[]): void {
    const el = document.querySelector('#console>p');
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const login = async () => {
    try {
      await web3Auth.connect();
    } catch {
      uiConsole(notInitializedMessage);
    }
  };

  const authenticateUser = async () => {
    if (!web3Auth.instance) {
      uiConsole(notInitializedMessage);

      return;
    }
    const idToken = await web3Auth.instance.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3Auth.instance) {
      uiConsole(notInitializedMessage);

      return;
    }
    const user = await web3Auth.instance.getUserInfo();
    console.log(user);
    uiConsole(user);
  };

  const logout = async () => {
    try {
      await web3Auth.disconnect();
    } catch {
      uiConsole(notInitializedMessage);
    }
  };

  const onGetPolkadotKeypair = async () => {
    if (!web3Auth.provider) {
      uiConsole(noProviderMessage);

      return;
    }
    const rpc = new PolkadotRPC(web3Auth.provider as SafeEventEmitterProvider);
    const polkadotKeypair = await rpc.getPolkadotKeyPair();
    uiConsole('Keypair', polkadotKeypair);
  };

  const getAccounts = async () => {
    if (!web3Auth.provider) {
      uiConsole(noProviderMessage);

      return;
    }
    const rpc = new PolkadotRPC(web3Auth.provider);
    const userAccount = await rpc.getAccounts();
    uiConsole('Address', userAccount);
  };

  const getBalance = async () => {
    if (!web3Auth.provider) {
      uiConsole(noProviderMessage);

      return;
    }
    const rpc = new PolkadotRPC(web3Auth.provider);
    const balance = await rpc.getBalance();
    uiConsole('Balance', balance);
  };

  const signAndSendTransaction = async () => {
    if (!web3Auth.provider) {
      uiConsole(noProviderMessage);

      return;
    }
    const rpc = new PolkadotRPC(web3Auth.provider);
    const result = await rpc.signAndSendTransaction();
    uiConsole('Transaction ID: ', result);
  };

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={onGetPolkadotKeypair} className="card">
            Get Polkadot Keypair
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signAndSendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: 'pre-line' }}>
        <p style={{ whiteSpace: 'pre-line' }}>Logged in Successfully!</p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth{' '}
        </a>
        & ReactJS Polkadot Example
      </h1>

      <div className="grid">{web3Auth.loggedIn ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/examples/tree/main/web-modal-sdk/polkadot/react-polkadot-modal-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
};

export const HomePage = withStores(stores)(observer(HomePageView));
