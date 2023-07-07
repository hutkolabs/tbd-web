import { UserApi } from '@api/example/users/user.api';
import { UserDto } from '@models/example';
import { TrinityFetcherStore } from '@store/trinity-fetcher.store';
import { makeAutoObservable } from 'mobx';

export class UserStore {
  api = new UserApi();

  users: TrinityFetcherStore<UserDto[]> = new TrinityFetcherStore([], this.api.getUsers, UserDto);

  get trinity() {
    return this.users.trinity;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
