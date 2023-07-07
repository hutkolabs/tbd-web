import { NotInitializedError } from '@errors/base/not-initialized.error';
import { makeAutoObservable } from 'mobx';
import { EnqueueSnackbar, ProviderContext, SnackbarKey, SnackbarMessage } from 'notistack';

export class SnackStore {
  //#region lib
  #context: ProviderContext | null = null;

  setSnackBarContext(context: ProviderContext) {
    this.#context = context;
  }

  private _enqueueSnackbar(...props: Parameters<EnqueueSnackbar>) {
    if (!this.#context?.enqueueSnackbar) {
      throw new NotInitializedError('SnackStore.enqueueSnackbar');
    }

    return this.#context.enqueueSnackbar(...props);
  }

  private _closeSnackbar(key?: SnackbarKey) {
    if (!this.#context?.closeSnackbar) {
      throw new NotInitializedError('SnackStore.closeSnackbar');
    }

    return this.#context?.closeSnackbar(key);
  }
  //#endregion

  constructor() {
    makeAutoObservable(this);
  }

  default(message: SnackbarMessage) {
    return this._enqueueSnackbar(message);
  }

  success(message: SnackbarMessage) {
    return this._enqueueSnackbar(message, { variant: 'success' });
  }

  error(message: SnackbarMessage) {
    return this._enqueueSnackbar(message, { variant: 'error' });
  }

  warning(message: SnackbarMessage) {
    return this._enqueueSnackbar(message, { variant: 'warning' });
  }

  info(message: SnackbarMessage) {
    return this._enqueueSnackbar(message, { variant: 'info' });
  }

  close(key?: SnackbarKey) {
    this._closeSnackbar(key);
  }
}
