import { ComponentType } from 'react';

import { RootStore } from '@store';
import { Prettify, StoresMap } from '@types';

import { useInjector } from './injector.hook';

export const injector =
  <Stores extends StoresMap<RootStore>>(storesRef: Stores) =>
  <TProps,>(
    Component: ComponentType<TProps>
  ): ComponentType<Prettify<Omit<TProps, keyof Stores>>> => {
    return (props: Prettify<Omit<TProps, keyof Stores>>) => {
      const stores = useInjector(storesRef);

      //@ts-ignore
      return <Component {...props} {...stores} />;
    };
  };

export const withStores = injector;
