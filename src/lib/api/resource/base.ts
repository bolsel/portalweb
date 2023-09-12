import {
  CollectionType,
  Query,
  ReadItemOutput,
  RegularCollections,
} from '@directus/sdk';
import { ApiItemsSchema } from '@/types';
import { ApiResRead, apiResRead } from './read';

export type CollectionKeys = RegularCollections<ApiItemsSchema>;
type CollectionItem<Collection extends CollectionKeys> = CollectionType<
  ApiItemsSchema,
  Collection
>;

export type TQuery<C extends CollectionKeys> = Query<
  ApiItemsSchema,
  CollectionItem<C>
>;

export interface IBaseNormalizerFn<
  Collection extends CollectionKeys,
  BaseFields extends TQuery<Collection>['fields'],
> {
  (
    data: ReadItemOutput<ApiItemsSchema, Collection, { fields: BaseFields }>,
    // data: ApplyQueryFields<
    //   ApiItemsSchema,
    //   CollectionItem<Collection>,
    //   BaseFields
    // >
  ): any;
}

type PathType = 'read' | 'create' | 'update' | 'delete';

export interface PathItemProps<
  Collection extends CollectionKeys,
  Type extends PathType,
> extends Omit<TQuery<Collection>, 'fields'> {
  paths: string[];
}
type PathConfigFn<Collection extends CollectionKeys, Type extends PathType> = {
  // query: TQuery<Collection>;
  (p: PathItemProps<Collection, Type>): any;
};

interface IApiBaseResource<
  Collection extends CollectionKeys,
  BaseFields extends TQuery<Collection>['fields'],
  BaseQuery extends TQuery<Collection>,
  BaseNormalizer extends IBaseNormalizerFn<Collection, BaseFields>,
> {
  collection: Collection;
  baseFields: BaseFields;
  baseQuery: BaseQuery;
  baseNormalizer: BaseNormalizer;
  errorThrow: (msg: string) => any;
  paths: Record<
    PathType,
    object
    // {
    //   [K in string]: any;
    // }
  >;
  addPath: <
    Key extends string,
    Type extends PathType,
    Path extends PathConfigFn<Collection, Type>,
  >(
    type: Type,
    key: Key,
    create: (res: this) => Path,
  ) => this & {
    paths: {
      [T in Type]: {
        [key in Key]: (
          p: Partial<PathItemProps<Collection, Type>>,
        ) => ReturnType<Path>;
      };
    };
  };
  read: ApiResRead<Collection, BaseFields, BaseQuery, BaseNormalizer>;
}
export function apiBaseResource<
  Collection extends CollectionKeys,
  BaseFields extends TQuery<Collection>['fields'],
  BaseQuery extends TQuery<Collection>,
  BaseNormalizer extends IBaseNormalizerFn<Collection, BaseFields>,
>(
  collection: Collection,
  {
    baseFields,
    baseQuery,
    baseNormalizer,
  }: {
    baseFields: BaseFields;
    baseQuery: BaseQuery;
    baseNormalizer: BaseNormalizer;
  },
): IApiBaseResource<Collection, BaseFields, BaseQuery, BaseNormalizer> {
  return {
    collection,
    baseFields,
    baseQuery,
    baseNormalizer,
    errorThrow,
    paths: {
      read: {},
      create: {},
      delete: {},
      update: {},
    },
    // @ts-ignore
    addPath(type, key, create) {
      const fn = (p: PathItemProps<Collection, PathType>) => {
        return create(this)(p);
      };
      this.paths[type] = { ...this.paths[type], ...{ [key]: fn } };
      return this;
    },
    get read() {
      return apiResRead({ collection, baseFields, baseQuery, baseNormalizer });
    },
  };
}
export const errorThrow = (msg: string) => {
  throw new Error(msg);
};
export function createApiResource<
  Collection extends CollectionKeys,
  BaseFields extends TQuery<Collection>['fields'],
  BaseQuery extends Omit<TQuery<Collection>, 'fields'>,
  BaseNormalizer extends IBaseNormalizerFn<Collection, BaseFields>,
>(
  collection: Collection,
  {
    baseFields,
    baseQuery,
    baseNormalizer,
  }: {
    baseFields: BaseFields;
    baseQuery: BaseQuery;
    baseNormalizer: BaseNormalizer;
  },
) {
  const res = apiBaseResource(collection, {
    baseFields,
    baseQuery,
    baseNormalizer,
  })
    .addPath('read', 'items', (res) => {
      return ({ paths = [], ...query }) => {
        return res.read.setQuery(query).items({ meta: false });
      };
    })
    .addPath('read', 'itemsMeta', (res) => {
      return ({ paths, ...query }) => {
        return res.read.setQuery(query).items({ meta: true });
      };
    });
  return res;
}
