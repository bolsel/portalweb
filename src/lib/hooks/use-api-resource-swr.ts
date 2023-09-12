'use client';

import qs from 'qs';
import {
  TApiResourceItemsList,
  TApiResourceItemsListKeys,
  TApiResourcePathReturn,
} from '../../types';
import useSWR from 'swr';
import { fetcherBase } from '../api/fetchers';
import type { PathItemProps } from '../api/resource/base';
import { urlToApiResource } from '@/init';

export type ApiSwrQueryProps<C extends TApiResourceItemsListKeys> = Partial<
  PathItemProps<C, 'read'>
>;

export default function useApiResourceSWR<
  C extends TApiResourceItemsListKeys,
  Path extends keyof TApiResourceItemsList[C]['paths']['read']
>(collection: C, path: Path, query?: ApiSwrQueryProps<C>) {
  const pathQueryStringBuild = (_pathQuery: any[]) => {
    return _pathQuery?.length ? `/${_pathQuery?.join('/')}` : '';
  };
  const paramsQueryStringBuild = (_paramsQuery: any) => {
    return _paramsQuery ? `?${qs.stringify(_paramsQuery)}` : '';
  };
  const paths = [path, ...(query?.paths ?? [])];
  const url = new URL(
    urlToApiResource(`/${collection}${pathQueryStringBuild(paths)}`)
  );
  url.search = paramsQueryStringBuild(query);

  return useSWR<TApiResourcePathReturn<C>['read'][Path]>(url.toString(), {
    fetcher: fetcherBase,
    revalidateOnFocus: false,
  });
}
