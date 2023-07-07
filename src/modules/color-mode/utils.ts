export const matchMedia = (query: string): MediaQueryList | null => {
  return window?.matchMedia ? window.matchMedia(query) : null;
};

export const isInEnum = <T extends Record<string, string | number>>(
  enumObject: T,
  value: string | number | undefined | null
): value is T[keyof T] => {
  if (!value) {
    return false;
  }

  return Object.values(enumObject).includes(value);
};
