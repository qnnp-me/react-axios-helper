export const pickObj = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: Array<K | readonly K[]>
) =>
  Object.fromEntries(
    Object.entries(obj).filter(([k]) => keys.flat().includes(k as K))
  );