import * as apiResourceItems from './items';

export { apiResourceItems };

type TResourceItems = typeof apiResourceItems;
export function apiResourceItem<K extends keyof TResourceItems>(
  key: K
): (typeof apiResourceItems)[K] {
  return apiResourceItems[key];
}

export function apiResourceItemRead<K extends keyof TResourceItems>(
  k: K
): TResourceItems[K]['read'] {
  return apiResourceItems[k].read;
}

export function apiResourceItemPathRead<K extends keyof TResourceItems>(
  k: K
): TResourceItems[K]['paths']['read'] {
  return apiResourceItems[k].paths.read;
}
