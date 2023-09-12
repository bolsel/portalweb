import { aggregate, readItems } from '@directus/sdk';
import { ApiClientOptions, apiClient } from '../instance';
import { CollectionKeys, IBaseNormalizerFn, TQuery, errorThrow } from './base';

export interface ApiResRead<
  Collection extends CollectionKeys,
  BaseFields extends TQuery<Collection>['fields'],
  BaseQuery extends TQuery<Collection>,
  BaseNormalizer extends IBaseNormalizerFn<Collection, BaseFields>,
> {
  clientOptions(o: ApiClientOptions): this;
  setQuery: (query: Omit<TQuery<Collection>, 'fields'>) => this;
  items: <
    Fields extends TQuery<Collection>['fields'],
    Normalizer extends IBaseNormalizerFn<Collection, Fields>,
    Meta extends boolean = false,
    Single extends boolean = false,
    ReturnNormalized = ReturnType<
      Fields extends any[] ? Normalizer : BaseNormalizer
    >,
    Data = Single extends true ? ReturnNormalized : ReturnNormalized[],
  >(p: {
    normalizer?: [Fields, Normalizer];
    meta?: Meta;
    single?: Single;
  }) => Promise<
    Meta extends true
      ? {
          data: Data;
          meta: {
            total_count: number;
            filter_count: number;
            limit: number;
            page: number;
          };
        }
      : Data
  >;
}

export function apiResRead<
  Collection extends CollectionKeys,
  BaseFields extends TQuery<Collection>['fields'],
  BaseQuery extends TQuery<Collection>,
  BaseNormalizer extends IBaseNormalizerFn<Collection, BaseFields>,
>({
  collection,
  baseFields,
  baseQuery,
  baseNormalizer,
}: {
  collection: Collection;
  baseFields: BaseFields;
  baseQuery: BaseQuery;
  baseNormalizer: BaseNormalizer;
}): ApiResRead<Collection, BaseFields, BaseQuery, BaseNormalizer> {
  let { limit, page, filter, sort } = { ...baseQuery };
  let clientOptions: ApiClientOptions = {};
  return {
    clientOptions(o) {
      clientOptions = o;
      return this;
    },
    setQuery(_query) {
      if (_query.limit) limit = _query.limit;
      if (_query.page) page = _query.page;
      if (baseQuery.filter && _query.filter) {
        filter = { _and: [baseQuery.filter, _query.filter] };
      } else {
        if (_query.filter) filter = _query.filter;
      }
      if (_query.sort) sort = _query.sort;
      return this;
    },
    // @ts-ignore
    async items({ normalizer, meta, single }) {
      const fields = normalizer?.[0] ? normalizer[0] : baseFields;
      const newQuery: any = {
        fields,
        filter,
      };
      if (limit) newQuery.limit = limit;
      if (page) newQuery.page = page;
      if (sort) newQuery.sort = sort;
      const query = {
        ...{ limit: 10, page: 1 },
        ...baseQuery,
        ...newQuery,
      };
      const client = apiClient(clientOptions);
      const data = await client.request(readItems(collection, query));
      let dataNormalized = data.map(
        // @ts-ignore
        normalizer ? normalizer[1] : baseNormalizer,
      );
      if (single) {
        if (!dataNormalized[0]) {
          errorThrow('Tidak ada data');
        }
        dataNormalized = dataNormalized[0];
      }
      if (meta === true) {
        const _countAll = await client.request(
          aggregate(collection, { aggregate: { count: '*' } }),
        );

        const _countFilter = await client.request(
          aggregate(collection, {
            aggregate: { count: '*' },
            query: { filter },
          }),
        );
        const countAll =
          _countAll.length && _countAll[0] && _countAll[0].count
            ? parseInt(_countAll[0].count)
            : 0;
        const countFilter =
          _countFilter.length && _countFilter[0] && _countFilter[0].count
            ? parseInt(_countFilter[0].count)
            : 0;
        return {
          data: dataNormalized,
          meta: {
            total_count: countAll,
            filter_count: countFilter,
            limit: query.limit,
            page: query.page,
          },
        };
      }
      return dataNormalized;
    },
  };
}
