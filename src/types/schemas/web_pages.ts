import { TDirectusFile, TDirectusStatusField, TDirectusUser } from './_base';
import { WebMenu } from './web_menu';
import { Websites } from './websites';

export interface WebPages {
  id: string;
  status: TDirectusStatusField;
  title: string;
  slug: string;
  description: null | string;
  website: string | Websites;
  image_cover: string | TDirectusFile;
  menu: string | WebMenu;
  sort: number;
  content: {
    time: number;
    blocks: JSON;
    version: string;
  };

  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
}
