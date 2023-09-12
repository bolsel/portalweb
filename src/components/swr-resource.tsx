'use client';

import useApiResourceSWR, {
  ApiSwrQueryProps,
} from '@/lib/hooks/use-api-resource-swr';
import { TApiResourceItemsList, TApiResourceItemsListKeys } from '@/types';
import { ReactNode } from 'react';

export default function SwrResource<
  C extends TApiResourceItemsListKeys,
  Path extends keyof TApiResourceItemsList[C]['paths']['read'],
  Res = ReturnType<typeof useApiResourceSWR<C, Path>>
>({
  collection,
  path,
  query,
  children,
  loadingComponent,
  emptyComponent,
}: {
  collection: C;
  path: Path;
  query?: ApiSwrQueryProps<C>;
  children: (props: Res) => ReactNode;
  loadingComponent?: (props: Res) => ReactNode;
  emptyComponent?: (props: Res) => ReactNode;
}) {
  const swrRes = useApiResourceSWR(collection, path, query);
  const loading = loadingComponent ? (
    loadingComponent(swrRes as Res)
  ) : (
    <div>Loading</div>
  );
  const empty = emptyComponent ? (
    emptyComponent(swrRes as Res)
  ) : (
    <div>Belum ada data.</div>
  );
  if (swrRes.isLoading) {
    return loading;
  }
  if (!swrRes.data) {
    return empty;
  }
  //@ts-ignore
  return children(swrRes);
}
