type TrinityLoading = {
  data: null;
  isLoading: true;
  error: null;
};

type TrinityError = {
  data: null;
  isLoading: false;
  error: Error;
};

type TrinityData<T> = {
  data: T;
  isLoading: false;
  error: null;
};

export type Trinity<T> = TrinityLoading | TrinityError | TrinityData<T>;
