import { createDirectus, staticToken, rest } from '@directus/sdk';
import { ApiItemsSchema } from '@/types';

export const apiInstance = createDirectus<ApiItemsSchema>(
  process.env.BACKEND_URL!
).with(staticToken(process.env.BACKEND_TOKEN!));

export type ApiClientOptions = RequestInit;
export const apiClient = (options?: ApiClientOptions) => {
  return apiInstance.with(
    rest({
      onRequest(o) {
        if (options) return { ...o, ...options };
        return o;
      },
    })
  );
};
