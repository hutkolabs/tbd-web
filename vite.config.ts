import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import babel from 'vite-plugin-babel';
import "reflect-metadata";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [
          'babel-plugin-transform-typescript-metadata',
        ]
      }
    })
  ],

  resolve: {
    alias: [
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@config', replacement: path.resolve(__dirname, 'src/config') },
      { find: '@errors', replacement: path.resolve(__dirname, 'src/errors') },
      { find: '@layout', replacement: path.resolve(__dirname, 'src/layout') },
      { find: '@models', replacement: path.resolve(__dirname, 'src/models') },
      { find: '@modules', replacement: path.resolve(__dirname, 'src/modules') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@providers', replacement: path.resolve(__dirname, 'src/providers') },
      { find: '@router', replacement: path.resolve(__dirname, 'src/router') },
      { find: '@server', replacement: path.resolve(__dirname, 'src/server') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ]
  }

})
