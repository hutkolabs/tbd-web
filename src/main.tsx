import React from 'react';

import { makeExampleServer } from '@server/example';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import 'reflect-metadata';
import '@total-typescript/ts-reset/filter-boolean';
makeExampleServer();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
