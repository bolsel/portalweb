import {
  TDirectusFile,
  TDirectusStatusField,
  TDirectusUser,
} from './_base';
export interface DocumentCategories {
  id: string;
  name: string;
  description?: string;
  slug: string;
  sort: number;
}
export type Documents = {
  id: string;
  status: TDirectusStatusField;
  publish_date: string;
  category: string | DocumentCategories;
  file: string | TDirectusFile;
  title: string;
  description: string;
  slug: string;

  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
};
