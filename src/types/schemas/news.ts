import { NewsCategories } from './news_categories';
import { TDirectusFile, TDirectusStatusField, TDirectusUser } from './_base';
export interface News {
  id: string;
  title: string;
  slug: string;
  publish_date: string;
  category: string | NewsCategories;
  image_cover: string | TDirectusFile;
  status: TDirectusStatusField;
  description: string;
  view_count: number;
  shared_count: number;
  reporter?: string;
  editor?: string;
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
