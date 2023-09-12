import * as resourceItems from '../lib/api/resource/items';

export type TApiResourceItemsList = typeof resourceItems;
export type TApiResourceItemsListKeys = keyof TApiResourceItemsList;

export type TApiResourcePathReturn<
  R extends TApiResourceItemsListKeys,
  Res extends TApiResourceItemsList[R] = TApiResourceItemsList[R]
> = {
  [T in keyof Res['paths']]: {
    [P in keyof Res['paths'][T]]: Awaited<
      // @ts-ignore
      ReturnType<Res['paths'][T][P]>
    >;
  };
};

export type TNewsItemBySlug = TApiResourcePathReturn<'news'>['read']['bySlug'];
export type TWebNewsItemBySlug =
  TApiResourcePathReturn<'web_news'>['read']['bySlug'];

export type TNewsOrWebNewsItemBySlug = TNewsItemBySlug | TWebNewsItemBySlug;

export type TDocumentItem =
  | TApiResourcePathReturn<'documents'>['read']['items'][0]
  | TApiResourcePathReturn<'organization_documents'>['read']['items'][0];
