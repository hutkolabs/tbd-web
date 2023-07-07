import { InjectedConnector, configureChains, createConfig } from '@wagmi/core';
import { goerli, polygonMumbai } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, polygonMumbai],
  [publicProvider()]
);

export const Connector = new InjectedConnector({
  chains
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [Connector]
});

export { chains };
