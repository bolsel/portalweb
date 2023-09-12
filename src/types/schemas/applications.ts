import {
  TDirectusFile,
  TDirectusStatusField,
  TDirectusUser,
} from './_base';
import { Organizations } from './organizations';

export interface ApplicationCategories {
  id: string;
  name: string;
  slug: string;
}

export interface Applications {
  id: string;
  status: TDirectusStatusField;
  sort: number;
  slug: string;
  title: string;
  description?: string;
  logo: string | TDirectusFile;
  categories: number[] | ApplicationCategoriesLink[];
  link?: string;
  links?: { link: string; name: string }[];
  social_media?: { link: string; name: string }[];
  organization?: string | Organizations;

  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
}

export interface ApplicationCategoriesLink {
  id: number;
  application: string | Applications;
  category: string | ApplicationCategories;
}
