import { CompleteSchema, CoreSchema, MergeCoreCollection } from '@directus/sdk';
import {
  ApplicationCategories,
  ApplicationCategoriesLink,
  Applications,
} from './applications';
import { BannerInfo } from './banner_info';
import { DocumentCategories, Documents } from './documents';
import { GrafikInfo } from './grafik_info';
import { News } from './news';
import { NewsCategories } from './news_categories';
import {
  OrganizationDocuments,
  OrganizationPejabat,
  OrganizationTypes,
  Organizations,
} from './organizations';
import { PortalWebSettings } from './portal_web_settings';
import { PublicServices, PublicServicesMedia } from './public_services';
import { WebAduanPublik } from './web_aduan_publik';
import { WebNews } from './web_news';
import { Websites } from './websites';
import { WebPages } from './web_pages';
import { WebMenu } from './web_menu';

export * from './_base';

export type ApiItemsSchema = CompleteSchema<{
  application_categories: ApplicationCategories[];
  application_categories_link: ApplicationCategoriesLink[];
  applications: Applications[];
  banner_info: BannerInfo[];
  document_categories: DocumentCategories[];
  documents: Documents[];
  grafik_info: GrafikInfo[];
  news: News[];
  news_categories: NewsCategories[];
  organization_documents: OrganizationDocuments[];
  organization_pejabat: OrganizationPejabat[];
  organization_types: OrganizationTypes[];
  organizations: Organizations[];
  portal_web_settings: PortalWebSettings;
  public_services_media: PublicServicesMedia[];
  public_services: PublicServices[];
  web_aduan_publik: WebAduanPublik[];
  web_menu: WebMenu[];
  web_news: WebNews[];
  web_pages: WebPages[];
  websites: Websites[];
  directus_users: MergeCoreCollection<
    CoreSchema,
    'directus_users',
    { content_author_name?: string }
  >;
}>;

export type ApiItemsSchemaKeys = keyof ApiItemsSchema;
