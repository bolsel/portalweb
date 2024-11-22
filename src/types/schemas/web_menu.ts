import { TDirectusStatusField, TDirectusUser } from './_base';
import { WebPages } from './web_pages';
import { Websites } from './websites';

export interface WebMenu {
  id: string;
  status: TDirectusStatusField;
  title: string;
  slug: string;
  website: string | Websites;
  sort: number;
  pages: WebPages[];

  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
}
