import {
  TDirectusFile,
  TDirectusStatusField,
  TDirectusUser,
} from './_base';
import { Websites } from './websites';

export interface WebNews {
  id: string;
  title: string;
  slug: string;
  publish_date: Date;
  website: string | Websites;
  image_cover: string | TDirectusFile;
  status: TDirectusStatusField;
  description: string;
  view_count: number;
  shared_count: number;
  reporter: string;
  editor?: string;
  tags?: string[];
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
